# Plan: Issue #60 — Faithfulness checker crashes when a context chunk has `text: None`

Issue: https://github.com/codepath/pathreview-ai301-fa26-s1/issues/60
Base commit: `f89c06fc3ff292df2a04a39ac51319d32a76b779` (`main`)
Labels: `bug`, `good first issue`, `rag`, `tier-1`

## Sources read

- `rag/evaluator/faithfulness_checker.py`
- `tests/unit/test_faithfulness_checker.py`
- `docs/CONTRIBUTING.md` and `.github/PULL_REQUEST_TEMPLATE.md`
- Issue #60. The issue body matches the `I-08` entry in `scripts/issues_manifest.json`.
  The issue also links an open PR, #74 (see Risks / unknowns).
- My Unit 2 reproduction on the thread:
  https://github.com/codepath/pathreview-ai301-fa26-s1/issues/60#issuecomment-5852811806
  (the evidence quoted below comes from it).
- Thread comments. `gh` is not installed locally. My first read of the issue's web page did
  not show the comments. A later read through the GitHub API (2026-10-04) found 21
  comments: my claim and my reproduction, plus claims, reproductions, and plan comments
  from other students. All of them had `author_association: NONE`, so no maintainer had
  commented at the time I checked.

## Diagnosis

`FaithfulnessChecker.check()` builds the context string at
`rag/evaluator/faithfulness_checker.py:38`:

```python
context_text = " ".join([chunk.get("text", "") for chunk in context_chunks])
```

`dict.get(key, default)` returns the default only when the key is **missing**. When the
key exists with value `None`, `.get()` returns `None`, so `str.join` gets a non-string
item and raises `TypeError`. The crash happens after claim extraction, so it only shows up
when the feedback has at least one extractable claim (a sentence over 10 characters).

## Verified Unit 2 evidence

Command:

```
.\.venv\Scripts\python.exe -m pytest tests/unit/test_faithfulness_checker.py -q
```

Output:

```
18 passed, 4 xfailed in 0.25s
```

Command:

```
.\.venv\Scripts\python.exe -c "from rag.evaluator.faithfulness_checker import FaithfulnessChecker; FaithfulnessChecker().check('Knows Python.', [{'text': None}])"
```

Output:

```
TypeError: sequence item 0: expected str instance, NoneType found
```

The four xfails are three `issue #59` tests plus `test_none_context_chunk_text` (`issue #60`).

## Scope

In scope:
- Treat an explicit `None` context `text` as empty text before joining.
- Keep current behavior for string `text` values and for chunks with no `text` key (both
  already contribute `""` or the string itself).

Out of scope:
- Converting `None` to a string. `str(None)` would add the token `"none"` to the context,
  so it must not happen.
- Any change to `_extract_claims`, `_is_supported`, the stop-word list, or scoring.
- Issue #59 (short claims can never be supported). Its three `strict=True` xfail tests stay
  as they are.
- Other non-string `text` values (e.g. `int`, `list`). They still raise as they do today.
  The issue only reports `None`.
- No other files: no `pyproject.toml` change (no #60 suppression exists there), no docs.

## Files

- `rag/evaluator/faithfulness_checker.py`: the one-line context assembly in `check()`.
- `tests/unit/test_faithfulness_checker.py`: remove the #60 xfail, strengthen the existing
  test, and add regressions.

## Approach

1. **Checker.** Replace only the context-assembly line so that a `None` value becomes `""`,
   for example:

   ```python
   context_text = " ".join(
       ["" if chunk.get("text") is None else chunk["text"] for chunk in context_chunks]
   )
   ```

   This uses an explicit `is None` check instead of `chunk.get("text") or ""`, so only
   `None` is normalized and other values are not coerced by truthiness. A missing key still
   gives `""` (`get` returns `None`, which then maps to `""`), the same as today.

2. **Remove the #60 xfail.** Delete only the `@pytest.mark.xfail(strict=True, reason="issue #60: ...")`
   decorator on `test_none_context_chunk_text`, as `docs/CONTRIBUTING.md` requires for
   seeded bugs. Leave the three `issue #59` decorators unchanged.

3. **Strengthen the existing None test.** `"Has Python skills"` yields one extractable claim
   (17 characters), and empty context cannot support it, so assert `score == 0.0` in place
   of the loose `0.0 <= score <= 1.0` range.

4. **Add a mixed valid-text/None regression.** Use feedback with a claim over 10 characters
   and at least two meaningful (non-stop-word) tokens that match the valid chunk, e.g.
   - feedback: `"The developer has strong Python skills."`
   - valid chunk: `{"text": "Strong Python skills shown in projects."}` (matches
     `strong`, `python`, `skills`)

   Assert that `check(feedback, [valid, {"text": None}]) == check(feedback, [valid])` and that
   the score is `1.0`.

5. **Cover None together with a missing key and an empty string.** Add a test with
   `[{"text": None}, {"content": "..."}, {"text": ""}, valid]`. It should give the same
   `1.0` as `[valid]` alone, which shows all three empty forms are treated alike.

## Test commands and expected outcomes

Before implementation (record actual output):

```
.\.venv\Scripts\python.exe -m pytest tests/unit/test_faithfulness_checker.py::TestFaithfulnessChecker::test_none_context_chunk_text -q --runxfail
```

Expected: 1 failed, with `TypeError: sequence item 0: expected str instance, NoneType found`.

After implementation (record actual output):

1. Re-run the exact Unit 2 commands:
   - `.\.venv\Scripts\python.exe -m pytest tests/unit/test_faithfulness_checker.py -q`.
     Expected: the #60 test and the new regressions pass, and the three #59 tests stay
     `xfailed` (no `XPASS(strict)`).
   - `.\.venv\Scripts\python.exe -c "from rag.evaluator.faithfulness_checker import FaithfulnessChecker; print(FaithfulnessChecker().check('Knows Python.', [{'text': None}]))"`.
     Expected: no `TypeError`, and the call returns **`0.0`**. I added `print(...)` so the
     return value is visible.
     - Correction to the earlier draft expectation of `0.5`: `"Knows Python"` is 12
       characters, which passes the `> 10` filter in `_extract_claims`, so the claim is
       **not** filtered out. With empty context it is unsupported, so the score is `0.0`.
       I confirmed this on the base commit without changing any code:
       `_extract_claims('Knows Python.')` returns `['Knows Python']`, and
       `check('Knows Python.', [{'content': 'x'}])` and `check('Knows Python.', [{'text': ''}])`
       both return `0.0`. So `None` will behave exactly like a missing key or an empty
       string. `0.5` comes only from feedback that has no claims over 10 characters, and
       this fix does not touch that path.
2. `... pytest ...::test_none_context_chunk_text -q --runxfail`. Expected: 1 passed.
3. Repository checks from CONTRIBUTING: `make lint`, `make typecheck`, `make test-unit`
   (and `make format` check). Expected: no new findings in the two touched files.

## Risks / unknowns

- PR #74 is another contributor's open PR. The house rules say credit attaches to my own
  posted plan, branch, and PR rather than being first. I will complete my independent course
  implementation and acknowledge #74; this does not imply that maintainers will merge
  duplicate fixes.
- **`or ""` vs `is None`.** The two differ only for falsy non-string values. My plan
  normalizes only `None`, which keeps the change as narrow as the issue.
- **Non-string, non-None `text` values** still raise `TypeError`. This is deliberately out
  of scope, and I will mention it in the PR as a possible follow-up.
- **Thread state can change.** The comment list above reflects the API read on 2026-10-04.
  Before posting and before opening the PR, I will check again for maintainer comments or
  instructions.
- **Exact pass counts after the fix** depend on how many regression tests I add, so they
  are not predicted here.

## Deviations

Implementation followed the two-file scope. The only files changed were
`rag/evaluator/faithfulness_checker.py` and `tests/unit/test_faithfulness_checker.py`. The
three `issue #59` xfail decorators are unchanged.

- **Approach step 5.** The combined None/missing-key/empty-string test
  (`test_none_missing_key_and_empty_text_chunks`) uses only empty context and expects `0.0`.
  The plan had it add a valid chunk and expect `1.0`. In the test, the missing-key chunk
  holds matching words under `content`, so `0.0` also shows that this chunk is ignored. The
  separate mixed valid/None test (`test_none_chunk_alongside_valid_chunk`) checks that support
  is preserved: the score is `1.0` both for valid text alone and for valid text plus a
  `None` chunk.
- **How commands were run.** The before and after commands were run from Git Bash as
  `.venv/Scripts/python.exe ...`, not from PowerShell as `.\.venv\Scripts\python.exe ...`.
  The interpreter and arguments were the same.
- **Validation tooling.** `make` is not installed, so I ran the underlying Makefile commands
  directly. At first `.venv` contained only `pytest` and `structlog`, so I installed the
  repository-declared dependencies with `.venv/Scripts/python.exe -m pip install -e ".[dev]"`,
  the Makefile setup step (ruff 0.16.10, black 26.10.0, mypy 2.4.0). No dependency or
  configuration files were changed. For `make format` I ran `black --check .` instead of
  `black .`, so no files were rewritten.

Evidence is saved outside the repository: before in `C:/Users/0051l/Downloads/issue60-before.txt`,
after in `C:/Users/0051l/Downloads/issue60-after.txt`. Both were captured on branch
`fix/60-none-context-text` at `f89c06f`, before the commit. The implementation is now
committed as `70cf0d7b22cd7948172525ae33702fdf6de83d22`.

| Command | Before | After |
|---|---|---|
| `pytest tests/unit/test_faithfulness_checker.py -q` | `18 passed, 4 xfailed`, exit 0 | `21 passed, 3 xfailed`, exit 0 |
| `pytest ...::test_none_context_chunk_text -q --runxfail` | `1 failed` (`TypeError` at line 38), exit 1 | `1 passed`, exit 0 |
| Unit 2 reproduction (`check('Knows Python.', [{'text': None}])`) | `TypeError: sequence item 0: expected str instance, NoneType found`, exit 1 | no error, exit 0 |
| Same reproduction wrapped in `print(...)` | not run | `0.0`, exit 0 |

Validation on the fixed working tree (all exit 0, no failing checks):

- `ruff check .` (lint): `All checks passed!`
- `black --check .` (format): `110 files would be left unchanged.`
- `mypy api/ core/ ingestion/ rag/ agent/ safety/` (typecheck): `Success: no issues found in 76 source files`
- `pytest tests/unit -v -m unit` (unit tests): `378 passed, 52 xfailed, 2 warnings`. Both
  warnings come from files this change does not touch: a Pydantic deprecation in
  `core/config.py` and an un-awaited `AsyncMock` coroutine warning in
  `tests/unit/test_semantic_chunker.py`.

Not run locally: `make test-integration` and the frontend job. CI runs both, and my plan did
not include them. Whether CI is green will be confirmed on the PR.
