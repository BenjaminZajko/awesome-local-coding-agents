import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const agentsPath = path.join(root, "data", "agents.json");
const tiersPath = path.join(root, "data", "model-tiers.json");

const fail = (message) => {
  console.error(`validation error: ${message}`);
  process.exitCode = 1;
};

const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`cannot parse ${path.relative(root, file)}: ${error.message}`);
    return null;
  }
};

const dataset = readJson(agentsPath);
const tiers = readJson(tiersPath);

if (!dataset || !tiers) process.exit(1);

const readmePath = path.join(root, "README.md");
if (fs.existsSync(readmePath)) {
  const readme = fs.readFileSync(readmePath, "utf8");
  if (readme.startsWith("# Awesome Local Coding Agents\\n")) {
    fail("README.md contains escaped newlines instead of real line breaks");
  }
}

if (dataset.schemaVersion !== 1) fail("data/agents.json schemaVersion must be 1");
if (!Array.isArray(dataset.agents)) fail("data/agents.json agents must be an array");
if (tiers.schemaVersion !== 1) fail("data/model-tiers.json schemaVersion must be 1");
if (!Array.isArray(tiers.tiers) || tiers.tiers.length !== 4) {
  fail("data/model-tiers.json must define exactly four tiers");
}

const allowedLocalSupport = new Set(["local-first", "local-capable"]);
const allowedSmallModel = new Set(["unverified", "candidate", "verified"]);
const allowedOffline = new Set(["yes", "conditional", "unknown"]);
const allowedStatus = new Set(["active", "historical"]);
const ids = new Set();
const repositories = new Set();

for (const [index, agent] of dataset.agents.entries()) {
  const prefix = `agents[${index}]`;

  for (const key of [
    "id",
    "name",
    "repository",
    "summary",
    "implementation",
    "status",
    "localSupport",
    "offline",
    "smallModelStatus",
    "lastReviewed"
  ]) {
    if (typeof agent[key] !== "string" || agent[key].trim() === "") {
      fail(`${prefix}.${key} must be a non-empty string`);
    }
  }

  if (ids.has(agent.id)) fail(`duplicate agent id: ${agent.id}`);
  ids.add(agent.id);

  if (repositories.has(agent.repository)) fail(`duplicate repository: ${agent.repository}`);
  repositories.add(agent.repository);

  if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(agent.repository)) {
    fail(`${agent.id}: repository must be a GitHub repository URL`);
  }

  if (!allowedStatus.has(agent.status)) fail(`${agent.id}: invalid status ${agent.status}`);
  if (!allowedLocalSupport.has(agent.localSupport)) fail(`${agent.id}: invalid localSupport ${agent.localSupport}`);
  if (!allowedSmallModel.has(agent.smallModelStatus)) fail(`${agent.id}: invalid smallModelStatus ${agent.smallModelStatus}`);
  if (!allowedOffline.has(agent.offline)) fail(`${agent.id}: invalid offline value ${agent.offline}`);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(agent.lastReviewed)) {
    fail(`${agent.id}: lastReviewed must be YYYY-MM-DD`);
  }

  if (!Array.isArray(agent.backends) || agent.backends.length === 0) {
    fail(`${agent.id}: backends must contain at least one local inference route`);
  }

  if (!Array.isArray(agent.evidence) || agent.evidence.length === 0) {
    fail(`${agent.id}: at least one evidence item is required`);
  } else {
    for (const evidence of agent.evidence) {
      if (!["documentation", "source", "test", "maintainer"].includes(evidence.type)) {
        fail(`${agent.id}: unsupported evidence type ${evidence.type}`);
      }
      if (typeof evidence.url !== "string" || !evidence.url.startsWith("https://github.com/")) {
        fail(`${agent.id}: evidence URL must point to GitHub`);
      }
      if (typeof evidence.note !== "string" || evidence.note.trim() === "") {
        fail(`${agent.id}: evidence note is required`);
      }
    }
  }

  if (!Array.isArray(agent.benchmarkResults)) {
    fail(`${agent.id}: benchmarkResults must be an array`);
  }

  if (agent.smallModelStatus === "verified") {
    const model = agent.smallestVerifiedModel;
    if (!model || typeof model !== "object") {
      fail(`${agent.id}: verified status requires smallestVerifiedModel`);
    } else if (typeof model.totalParametersB !== "number" || model.totalParametersB > 14) {
      fail(`${agent.id}: verified status requires a <=14B total-parameter model`);
    }
    if (agent.benchmarkResults.length === 0) {
      fail(`${agent.id}: verified status requires benchmarkResults`);
    }
  } else if (agent.smallestVerifiedModel !== null) {
    fail(`${agent.id}: smallestVerifiedModel must be null unless status is verified`);
  }
}

if (process.exitCode) process.exit(process.exitCode);
console.log(`validated ${dataset.agents.length} agent entries`);
