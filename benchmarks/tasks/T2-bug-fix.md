# T2 v1 — Bug Fix

**Goal:** diagnose and repair a seeded defect without being told the faulty file.

The v0.2 fixture will start with a deterministic failing test. The initial prompt will say only that the test suite is failing and ask the agent to find the cause, fix it, and verify the repository.

**Pass:** hidden evaluator and project tests pass, with no unrelated behavior changes.

**Fail:** tests still fail, expected behavior is weakened, tests are deleted/disabled, or manual hints are required.
