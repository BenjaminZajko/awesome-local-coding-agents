# T0 v1 — Tool Use

**Goal:** prove that the agent/model combination can complete the minimum coding loop.

The versioned fixture introduced in v0.2 will require the agent to:

1. inspect a named project file;
2. run the project's verification command;
3. make one bounded edit requested by the prompt;
4. rerun verification successfully.

**Pass:** expected file state is present and verifier exits 0.

**Fail:** the agent only describes the edit, emits malformed tool calls, changes unrelated files, or cannot complete verification.

No corrective prompt is allowed.
