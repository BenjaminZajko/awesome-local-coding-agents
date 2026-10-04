# Benchmarks

This directory holds the benchmark task contracts and submitted raw results.

## Current state

v0.1 defines the protocol and task contracts. v0.2 will add resettable fixture repositories and deterministic evaluators before the first official verification runs are accepted.

Until those fixtures land, agent entries may be `candidate` or `unverified`, but not `verified`.

## Result filenames

Use:

```text
<agent-id>--<model-slug>--<task-id>--<YYYYMMDD>-<attempt>.json
```

Example:

```text
hax--qwen3-coder-8b-q4_k_m--t2-v1--20261004-1.json
```

## Submission principles

- preserve failed attempts;
- remove secrets;
- use a clean task fixture;
- record manual intervention truthfully;
- prefer immutable agent/model versions;
- include verifier output.
