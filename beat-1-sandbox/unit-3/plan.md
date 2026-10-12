# Plan: Issue #60 — Faithfulness checker crashes when a context chunk has `text: None`

Issue: https://github.com/codepath/pathreview-ai301-fa26-s1/issues/60
Base commit: `f89c06fc3ff292df2a04a39ac51319d32a76b779`
Implementation commit: `70cf0d7b22cd7948172525ae33702fdf6de83d22`
Branch: `fix/60-none-context-text`

## Sources read

- `rag/evaluator/faithfulness_checker.py`
- `tests/unit/test_faithfulness_checker.py`
- `docs/CONTRIBUTING.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- Issue #60 and the matching `I-08` entry in `scripts/issues_manifest.json`.
- My Unit 2 reproduction:
  https://github.com/codepath/pathreview-ai301-fa26-s1/issues/60#issuecomment-5852811806
- The issue thread, checked through the GitHub API on 2026-10-04.
  That read found 21 comments, including claims, reproductions, and
  plans from students. All had `author_association: NONE`; no
  maintainer comment was found at that time.
- The issue linked another contributor's open PR, #74, at the time
  of the Unit 3 investigation.

These thread observations describe the earlier read, not the current
thread state. The thread must be checked again before opening my PR.

## Diagnosis

`FaithfulnessChecker.check()` assembled context with:

```python
context_text = " ".join([chunk.get("text", "") for chunk in context_chunks])
```

`dict.get(key, default)` uses the default only when the key is missing.
When `text` exists with value `None`, it returns `None`. Passing that
value to `str.join` raises:

```text
TypeError: sequence item 0: expected str instance, NoneType found
```

The crash occurs after claim extraction. Reproduction therefore needs
feedback containing at least one extractable claim: a sentence longer
than 10 characters.

## Verified Unit 2 evidence

The original reproduction used:

```cmd
.venv\Scripts\python.exe -c "from rag.evaluator.faithfulness_checker import FaithfulnessChecker; FaithfulnessChecker().check('Knows Python.', [{'text': None}])"
```

Before implementation, this raised:

```text
TypeError: sequence item 0: expected str instance, NoneType found
```

Exit code: 1.

The original checker test file reported:

```text
18 passed, 4 xfailed
```

The four expected failures were the three issue #59 tests and
`test_none_context_chunk_text` for issue #60.

The saved before transcript was recorded on the base commit before
implementation. Its actual recorded timing was:

```text
18 passed, 4 xfailed in 0.10s
```

Forcing the issue #60 test to run with `--runxfail` produced one failed
test with the same TypeError and exit code 1. The original transcript
is included in `test_evidence.md`.

## Scope

In scope:

- Treat explicit `None` context text as empty text before joining.
- Preserve existing behavior for string text and missing `text` keys.
- Remove only the issue #60 expected-failure marker.
- Strengthen the existing test and add focused regression tests.

Out of scope:

- Converting `None` to the string `"None"`.
- Changing claim extraction, support matching, stop words, or scoring.
- Fixing issue #59. Its three expected-failure markers remain unchanged.
- Handling other non-string text values, such as integers and lists.
  They continue to raise TypeError.
- Unrelated cleanup, documentation, or configuration changes.

No issue #60 suppression was found in `pyproject.toml`, so no change
to that file was planned or made.

## Files

- `rag/evaluator/faithfulness_checker.py`
- `tests/unit/test_faithfulness_checker.py`

## Approach

1. Replace only the context assembly in `check()` with an explicit
   `is None` check:

   ```python
   context_text = " ".join(
       ["" if chunk.get("text") is None else chunk["text"] for chunk in context_chunks]
   )
   ```

   This normalizes None without coercing other values by truthiness.
   A missing key also contributes an empty string, preserving its
   existing behavior.

2. Remove the issue #60 `@pytest.mark.xfail` decorator from
   `test_none_context_chunk_text`. Leave issue #59 markers unchanged.

3. Strengthen the existing None test to assert `score == 0.0`.
   Its feedback produces an extractable claim, and empty context
   cannot support that claim.

4. Add a mixed valid-text/None regression using:

   - Feedback: `"The developer has strong Python skills."`
   - Valid context: `{"text": "Strong Python skills shown in projects."}`

   Assert that valid context alone scores 1.0 and adding a None-text
   chunk preserves that score.

5. Add a combined None, missing-key, empty-string, and valid-text test.
   The original plan expected the combined input to score 1.0, matching
   valid context alone. The implemented variation is recorded below.

## Test plan

### Before implementation

Run the existing issue #60 test with its expected-failure marker disabled:

```cmd
.venv\Scripts\python.exe -m pytest tests/unit/test_faithfulness_checker.py::TestFaithfulnessChecker::test_none_context_chunk_text -q --runxfail
```

Expected: one failure with the reported TypeError.

Run the Unit 2 reproduction command. Expected: the same TypeError.

### After implementation

Re-run the checker test file:

```cmd
.venv\Scripts\python.exe -m pytest tests/unit/test_faithfulness_checker.py -q
```

Expected: the issue #60 test and new regressions pass, while the three
issue #59 tests remain xfailed.

Re-run the Unit 2 reproduction unchanged. Expected: no TypeError.

Expose the return value with:

```cmd
.venv\Scripts\python.exe -c "from rag.evaluator.faithfulness_checker import FaithfulnessChecker; print(FaithfulnessChecker().check('Knows Python.', [{'text': None}]))"
```

Expected: 0.0. `"Knows Python"` passes the claim-length filter, so empty
context produces an unsupported claim rather than the no-claims
default of 0.5.

Run the targeted issue #60 test with `--runxfail` again.
Expected: one passed test.

Run repository validation:

- `make test-unit`
- `make lint`
- `make typecheck`
- Check formatting without rewriting unrelated files.

Unit 4 additionally requires attempting `make test-integration` and
recording its actual result.

## Risks and unknowns

- Another contributor's PR does not block an independent course PR.
  The earlier investigation identified PR #74; its current status
  has not been established in this document.
- An explicit `is None` check keeps the fix limited to the reported
  input rather than normalizing all falsy values.
- Other non-string, non-None values remain unsupported and may be
  considered separately.
- Thread instructions can change and require a fresh check before
  opening the PR.
- Local checks do not establish that GitHub CI is green.

## Deviations

### Combined empty-context test

The implemented `test_none_missing_key_and_empty_text_chunks` uses
only None, a missing text key, and an empty string, and expects 0.0.
The original step 5 included a valid chunk and expected 1.0.

The missing-key chunk contains matching words under `content`.
The 0.0 result therefore also confirms that `content` is not used
as a substitute for `text`.

The separate `test_none_chunk_alongside_valid_chunk` verifies that a
valid chunk scores 1.0 both alone and alongside a None-text chunk.

### Validation tooling

make is not installed locally. Validation used the same underlying
commands specified in the Makefile, with the project's virtual
environment.

During Unit 3, repository-declared development dependencies were
installed using `python -m pip install -e ".[dev]"`. No dependency or
configuration files were changed.

For formatting, Unit 3 used `black --check .` instead of the mutating
`black .` target. It reported 110 files would be left unchanged.

Earlier validation ran in Git Bash. The current Unit 4 validation ran
in CMD with equivalent interpreter paths and arguments.

## Current implementation and validation

The two-file implementation is committed at:

```text
70cf0d7b22cd7948172525ae33702fdf6de83d22
```

The issue #60 xfail marker was removed. The issue #59 markers remain.

Current Unit 4 results:

| Check | Recorded result | Exit code |
|---|---|---|
| Original Unit 2 reproduction | No TypeError; log reports score 0.0 | 0 |
| Reproduction with print | Returns 0.0 | Not separately captured |
| Checker test file | 21 passed, 3 xfailed in 0.27s | Not separately captured |
| Unit suite | 378 passed, 52 xfailed, 1 warning in 8.48s | 0 |
| Integration | Collected 0 items; no tests ran in 0.13s | 5 |
| Lint | All checks passed! | 0 |
| Typecheck | No issues found in 76 source files | 0 |

The unit-suite output also contains an un-awaited coroutine
RuntimeWarning, in addition to the Pydantic warning in the pytest
summary. The raw warnings are retained in `test_evidence.md`.

Integration's no-tests result matches the course instructions.
It is recorded as no tests ran, not as a passing integration suite.

The before transcript and current validation output are collected
in `test_evidence.md`. Frontend validation was attempted. The implementation commit produced
17 passed and one 5000ms timeout in the portfolio URL character-limit
test on three runs. Baseline main passed once in a temporary worktree;
the implementation commit then timed out in that same worktree.
Frontend files are identical between the two commits. The timeout's
cause remains unresolved, and no frontend changes were made.
Formatting was also rechecked: 110 files unchanged, exit 0.
GitHub CI has not yet been verified.