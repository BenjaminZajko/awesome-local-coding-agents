# Awesome Local Coding Agents — Project Specification

## 1. Purpose

Build the most useful evidence-backed directory of terminal coding agents for developers who want to run local LLMs, especially small models on consumer hardware.

The project is intentionally narrower than broad CLI-agent directories. It should answer questions such as:

- Which CLI coding agents can actually use Ollama, llama.cpp, LM Studio, vLLM, MLX, or another local OpenAI-compatible server?
- Which agents are designed to conserve context, RAM, VRAM, or tool-call complexity?
- Which combinations of agent + model + runtime have been demonstrated to complete real software-engineering tasks?
- What is the smallest model that has been reproducibly useful with each agent?
- What hardware and quantization were used?

The central rule is:

> Local-capable is a compatibility claim. **Small-model verified is an empirical claim.**

Documentation can establish the first claim. Only reproducible benchmark evidence can establish the second.

## 2. Scope

### In scope

A project qualifies for the active list when it:

1. Has a CLI or terminal-native interface.
2. Can autonomously read/write source code and/or execute development commands.
3. Has a documented path to local inference.
4. Is currently usable and not explicitly archived or abandoned.
5. Has evidence links that a reviewer can inspect.

Local inference includes direct or supported use of runtimes such as Ollama, llama.cpp, LM Studio, vLLM, MLX, LocalAI, or a local OpenAI-compatible endpoint.

### Out of scope

- IDE-only assistants with no CLI.
- Chat frontends that cannot operate on a repository.
- Pure inference servers with no coding-agent loop.
- Cloud-only agents.
- Generic agent frameworks with no usable coding CLI.
- Projects whose only local-model claim is an unverified third-party comment.
- Archived/read-only projects in the active table. They may later live in a historical section.

## 3. Positioning

This repository is not:

- a mirror of broad "awesome coding agents" lists;
- a general list of cheap API providers;
- a model leaderboard;
- a list of local inference runtimes.

Its differentiator is the intersection:

**terminal coding agent × local inference × small-model engineering × reproducible evidence**

## 4. Trust model and labels

### Local-first

Local inference is a first-class product path or an explicit design priority.

### Local-capable

The agent has a documented and supported route to local inference, but the project is not primarily designed around local operation.

### Small-model candidate

There is a credible engineering reason to expect good behavior with constrained models — for example reduced context, local retrieval, tool-call shims, structured fallbacks, or explicit small-model design — but no qualifying benchmark result has been submitted yet.

### Small-model verified

The repository contains reproducible benchmark evidence for a model with no more than 14B total parameters.

A README statement such as "works with Ollama" can never produce this badge by itself.

## 5. Model-size tiers

Model tiers use **total parameter count**, not active MoE parameters, because total parameters are the more conservative indicator for storage and memory planning.

- Tiny: <= 4B
- Small: > 4B and <= 14B
- Medium-local: > 14B and <= 32B
- Large-local: > 32B

For MoE models, benchmark results should additionally record active parameters when known.

Quantization does not change the model's tier. It is recorded separately.

## 6. Data architecture

The source of truth is structured JSON under `data/`.

`data/agents.json` stores curated agent metadata and evidence. The public README is generated from this file.

Benefits:

- deterministic ordering;
- schema-like validation;
- easier community PR review;
- future website/search UI without rewriting the dataset;
- automated stale-entry checks;
- benchmark results can link to stable agent IDs.

The README must not become a second source of truth.

## 7. Benchmark policy

Benchmarking is intentionally conservative.

A benchmark result records:

- agent and exact agent version/commit;
- model ID and model family;
- total parameter count and active parameter count when applicable;
- quantization;
- inference backend and backend version;
- context window;
- relevant decoding settings;
- OS, CPU, GPU, system RAM and VRAM/unified memory;
- benchmark task/version;
- command used to launch the agent;
- whether manual intervention occurred;
- elapsed time;
- pass/fail result;
- verifier output or other evidence.

### Small-model verification gate

An agent may be marked `verified` only when the same <=14B model configuration has:

1. passed T0 Tool Use;
2. passed T2 Bug Fix;
3. passed at least one of T1 Repository Understanding or T3 Multi-file Change;
4. required no manual intervention beyond the initial task and ordinary permission approval.

T4 Autonomous Completion is a higher-difficulty signal but is not required for the first verification badge.

## 8. Benchmark tasks

- **T0 Tool Use** — reliably read a file, run a command, edit a file, and verify the edit.
- **T1 Repository Understanding** — inspect an unfamiliar repository and answer architecture questions grounded in the code.
- **T2 Bug Fix** — diagnose and fix a seeded failing test without being told the faulty file.
- **T3 Multi-file Change** — implement a feature requiring coordinated changes across multiple files and tests.
- **T4 Autonomous Completion** — take a bounded feature request from prompt to implementation, tests, and final verification.

Each task is versioned. Changing acceptance criteria creates a new task version.

## 9. Ranking philosophy

Do not sort primarily by GitHub stars.

Default ranking should prioritize:

1. small-model verified;
2. small-model candidate;
3. local-first over merely local-capable;
4. alphabetical order as the stable tie-breaker.

A later website may expose sortable stars, activity, benchmark pass rate, tokens, and speed, but popularity must not be confused with local-model quality.

## 10. Evidence policy

Each active entry requires at least one first-party evidence URL.

Preferred evidence, in order:

1. current project documentation;
2. current source code/configuration;
3. project-maintained examples or tests;
4. maintainer statement.

Community posts are supplemental and must not be the sole evidence for local support.

Evidence should be re-reviewed periodically. `lastReviewed` records the latest manual review date.

## 11. Repository layout

```text
.
├── README.md                    # generated
├── SPEC.md
├── CONTRIBUTING.md
├── LICENSE
├── data/
│   ├── agents.json
│   └── model-tiers.json
├── scripts/
│   ├── generate-readme.mjs
│   └── validate.mjs
├── docs/
│   ├── methodology.md
│   └── verification.md
├── benchmarks/
│   ├── README.md
│   ├── tasks/
│   └── results/
└── .github/
    ├── ISSUE_TEMPLATE/
    ├── pull_request_template.md
    └── workflows/
```

## 12. v0.1 definition of done

The first public version is complete when:

- the scope and trust model are documented;
- structured agent data exists;
- README generation is deterministic;
- validation rejects malformed or overstated entries;
- CI runs validation and checks README freshness;
- contributor templates request evidence;
- benchmark methodology and result format exist;
- the initial seed contains multiple current agents with first-party evidence;
- no agent is labeled small-model verified without benchmark evidence.

## 13. Next milestones

### v0.2 — Benchmark fixtures

Create pinned, resettable fixture repositories and deterministic task evaluators for T0-T3.

### v0.3 — First verified runs

Run at least three agents against <=14B models on common consumer hardware and publish raw result records.

### v0.4 — Freshness automation

Add scheduled checks for archived repositories, moved repositories, release activity, and broken evidence links.

### v0.5 — Hardware explorer

Generate views such as "16 GB Apple Silicon", "8 GB VRAM", "CPU-only", and "24 GB GPU".

### v1.0 — Trusted directory

Reach broad agent coverage, multiple independent benchmark contributors, documented review governance, and stable benchmark task versions.
