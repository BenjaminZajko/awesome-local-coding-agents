# Benchmark Methodology

## Objective

Measure whether a coding-agent harness can turn a constrained local model into a useful software-engineering agent.

The benchmark is about the **combination** of:

`agent + model + quantization + inference backend + context configuration + hardware`

A model-only score is not enough, because the harness controls context selection, tool schemas, retries, edit format, validation loops, and failure recovery.

## Required run metadata

Every result must record:

- agent name and immutable version/commit where possible;
- model ID;
- total parameter count;
- active parameter count for MoE models when known;
- quantization;
- inference backend and version;
- context length;
- decoding/reasoning settings that materially affect the run;
- operating system;
- CPU;
- GPU;
- system RAM;
- VRAM or unified memory;
- task ID and task version;
- exact launch command with secrets removed;
- start/end timestamps or elapsed seconds;
- manual intervention count;
- final pass/fail;
- verifier output.

## Clean-run rules

Each task begins from the same clean fixture state.

The agent may inspect any file inside the benchmark workspace. It must not be given hidden evaluator logic or the expected patch.

Network access should be disabled for benchmark tasks unless the task explicitly requires it.

A run is **unassisted** when the human provides only:

1. the standard task prompt;
2. ordinary permission approval for commands or edits.

Hints, corrective prompts, file pointers, patch suggestions, model switching, or manual edits make the run assisted and therefore ineligible for the Small-model verified badge.

## Attempts

Raw results are never deleted because a later attempt succeeds.

For comparative statistics, the preferred protocol is three fresh attempts per agent/model/task configuration. Report pass rate as well as median elapsed time for successful attempts.

The first verification badge can be earned from qualifying successful runs before a three-run statistical set exists, but the README should not imply reliability percentages until repeated runs are available.

## Core tasks

### T0 — Tool Use

Tests whether the model can reliably participate in the agent loop: inspect files, invoke a command, make an edit, and verify the edit.

### T1 — Repository Understanding

Tests context selection and grounded reasoning over an unfamiliar codebase.

### T2 — Bug Fix

Tests search, diagnosis, editing, command execution, and test-driven correction.

### T3 — Multi-file Change

Tests coordinated edits, dependency awareness, and verification across multiple files.

### T4 — Autonomous Completion

Tests a longer bounded task from initial requirement through implementation and validation.

## Small-model verification threshold

"Small" means no more than 14B **total** parameters.

To earn the badge with one model configuration, the agent must have unassisted passing results for:

- T0;
- T2;
- at least one of T1 or T3.

T4 is reported separately and is not required for the first badge.

## Metrics

The first benchmark version records:

- pass/fail;
- elapsed time;
- manual interventions;
- model/runtime errors;
- tool-call failures;
- agent turns when observable;
- input/output tokens when the runtime exposes them.

Later versions may add energy use and peak memory, but those fields should not be guessed when unavailable.

## Hardware interpretation

Hardware affects speed and feasibility, not task correctness.

A passing result on a 24 GB GPU does not prove the same configuration fits in 16 GB unified memory. Hardware-specific views must filter actual submitted runs rather than infer compatibility from model size alone.

## Reproducibility

A benchmark PR should contain enough information for another contributor to recreate the run. If exact reproduction requires undocumented local changes, the result should be treated as experimental rather than verification-grade.
