# Verification Policy

## Two independent axes

### Local support

**Local-first**: local inference is central to the project or a first-class documented path.

**Local-capable**: a supported local path exists, commonly through Ollama, llama.cpp, LM Studio, vLLM, MLX, LocalAI, or a local OpenAI-compatible server.

Both labels require first-party evidence.

### Small-model status

**Unverified**: no small-model performance claim is made.

**Candidate**: there is a concrete reason to prioritize the agent for <=14B testing, but no qualifying benchmark evidence exists yet.

**Verified**: qualifying benchmark result files exist and satisfy the gate in `docs/methodology.md`.

## What does not count as verification?

The following are useful evidence for compatibility but not small-model verification:

- an Ollama provider;
- a screenshot of a local chat;
- a README saying "works with local models";
- a maintainer saying a model "should work";
- a successful one-line code generation prompt;
- an unrepeatable result with missing model/hardware/runtime information.

## Downgrading a badge

A verified badge may be removed if:

- the result cannot be reproduced because critical metadata is missing;
- the benchmark task was later discovered to be invalid;
- manual assistance was omitted from the submission;
- the result refers to a materially different agent than the listed project.

Historical benchmark files should remain in git with a correction note rather than being silently rewritten.

## Evidence freshness

`lastReviewed` is the date an entry's first-party evidence was manually checked.

Future automation may flag entries that have not been reviewed recently, but automation must not silently promote an agent to `verified`.
