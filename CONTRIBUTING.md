# Contributing

Thanks for helping build an evidence-backed directory rather than another unverified link list.

## Adding or updating an agent

1. Edit `data/agents.json`.
2. Add at least one first-party evidence URL.
3. Use the narrowest truthful label:
   - `local-first` only when local inference is a first-class design path.
   - `local-capable` when local inference is supported but is not the project's main identity.
4. Use `candidate` only when there is a concrete small-model engineering signal.
5. Never use `verified` without qualifying benchmark result files.
6. Run:

```bash
npm run generate
npm run check
```

Do not hand-edit `README.md`. It is generated.

## Evidence quality

Preferred sources:

1. project documentation;
2. current source code or configuration;
3. project-maintained tests/examples;
4. maintainer statements.

A social post, Reddit comment, or issue comment may be useful supporting context, but it cannot be the sole evidence for an active entry.

## Small-model claims

"Supports Ollama", "supports OpenAI-compatible APIs", and "works locally" are compatibility claims, not proof of performance on small models.

The `candidate` label needs an explicit reason, such as:

- context reduction or retrieval designed to avoid dumping a repository;
- a tool-call shim/fallback for models with weak structured output;
- explicit small-model design language;
- unusually low harness memory overhead;
- direct support for constrained local inference.

The `verified` label requires benchmark evidence described in `docs/verification.md`.

## Benchmark submissions

A benchmark PR should include:

- one JSON result per task under `benchmarks/results/`;
- exact agent version or commit;
- exact model and total parameter count;
- quantization;
- inference backend and version;
- context window;
- hardware details;
- launch command with secrets removed;
- whether manual intervention occurred;
- task result and verifier output.

Do not include API keys, access tokens, passwords, private repository content, usernames, hostnames, or other secrets.

## Review principles

Maintainers should optimize for correctness, reproducibility, and usefulness rather than list size.

An entry may be moved to a historical section if the upstream project becomes archived, explicitly read-only, or no longer provides a usable local path.

## Pull request checklist

- [ ] The project has a CLI/terminal interface.
- [ ] It can operate on a codebase.
- [ ] Local inference is documented.
- [ ] Evidence is first-party.
- [ ] Labels are conservative.
- [ ] `npm run check` passes.
- [ ] README was regenerated.
