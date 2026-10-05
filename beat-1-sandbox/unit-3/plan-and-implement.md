# Unit 3 — Plan and Build

Path: `beat-1-sandbox/unit-3/plan-and-implement.md`

Record of your plan, the branch you built it on, and the evaluation runs that produced
`eval-run.txt`. This file is graded at the path above; a copy kept anywhere else in the
repository is not read.

Complete every labelled field below. Each is graded on its own; content placed under the wrong
label is not graded.

---

## Posted upstream

**GitHub username**

bing-ying-li

**Plan comment**

https://github.com/codepath/pathreview-ai301-fa26-s1/issues/60#issuecomment-5988561226

Posted text:

Following up on my reproduction of this issue, here is my implementation plan. I've seen that PR #74 already addresses this issue.

**Cause:** In `FaithfulnessChecker.check()`, `chunk.get("text", "")` only uses the default when the `text` key is missing. With `{"text": None}` it returns `None`, and `" ".join(...)` then raises `TypeError: sequence item 0: expected str instance, NoneType found`. I reproduced this on `main` (f89c06f) with the command from the issue, and the test file showed `18 passed, 4 xfailed`. My environment, exact commands, and output are in [my reproduction](https://github.com/codepath/pathreview-ai301-fa26-s1/issues/60#issuecomment-5852811806).

**Planned fix (bounded):**
- In `rag/evaluator/faithfulness_checker.py`, map an explicit `None` text to `""` before joining, using an `is None` check rather than `or ""` so no other values get coerced. String text and missing keys behave exactly as they do now. I won't stringify `None`, and I won't change claim extraction or scoring. The short-claim behavior is #59 and stays out of scope.
- In `tests/unit/test_faithfulness_checker.py`, I'll remove only the #60 `xfail` marker and tighten `test_none_context_chunk_text` to expect `0.0`. I'll also add regressions showing that a `None` chunk next to a valid chunk gives the same score as the valid chunk alone (`1.0`), and that `None`, a missing key, and `""` are all treated alike.

**Testing:** Before the fix I'll run the #60 test with `--runxfail` to show the real failure, then again after. After the fix I'll run the full checker test file, where the #60 test and new tests should pass and the three #59 tests should stay xfailed, plus `make lint`, `make typecheck`, and `make test-unit`. The issue's repro should return `0.0` instead of crashing. I'll post the actual output in the PR.

**AI disclosure:** I used an AI assistant (Claude Code) to read the code, check my diagnosis, and draft this plan. I've reviewed it, and I'll run and verify every result myself.

---

## Your branch

**Branch**

`fix/60-none-context-text` (pushed to my fork: https://github.com/bing-ying-li/pathreview-ai301-fa26-s1/tree/fix/60-none-context-text). The fix is commit `70cf0d7b22cd7948172525ae33702fdf6de83d22`.

**Evidence**

I re-ran my Unit 2 reproduction before and after the change. The before run is on the
unchanged base commit `f89c06f`. The after run is on the same branch with the fix applied in
the working tree, just before I committed it as `70cf0d7`. Both are copied from
the evidence files I saved at the time. The only change is that trailing spaces on a few
pytest traceback lines are trimmed.

Before (`issue60-before.txt`). The named test fails with the `TypeError` under `--runxfail`, and
the Unit 2 reproduction raises the same `TypeError`:

The BEFORE logger omitted the surrounding quotes on the python -c argument. The code was passed as one argument. To re-run it in Git Bash, use:

```bash
.venv/Scripts/python.exe -c "from rag.evaluator.faithfulness_checker import FaithfulnessChecker; FaithfulnessChecker().check('Knows Python.', [{'text': None}])"
```

```text
Issue #60 BEFORE evidence (no implementation or test changes)
Recorded: 2026-10-05T05:20:13Z
Repo: /c/Users/0051l/Downloads/pathreview-ai301-fa26-s1
Branch: fix/60-none-context-text
Commit: f89c06fc3ff292df2a04a39ac51319d32a76b779
Python: Python 3.14.5
Shell: Git Bash; commands run from repository root
git status --short:
?? comment.md
?? plan.md

----- COMMAND
.venv/Scripts/python.exe -m pytest tests/unit/test_faithfulness_checker.py -q
----- STDOUT
..x...x......x....x...                                                   [100%]
18 passed, 4 xfailed in 0.10s
----- STDERR
----- EXIT CODE: 0

----- COMMAND
.venv/Scripts/python.exe -m pytest tests/unit/test_faithfulness_checker.py::TestFaithfulnessChecker::test_none_context_chunk_text -q --runxfail
----- STDOUT
F                                                                        [100%]
================================== FAILURES ===================================
____________ TestFaithfulnessChecker.test_none_context_chunk_text _____________

self = <tests.unit.test_faithfulness_checker.TestFaithfulnessChecker object at 0x0000022E3A9A3F70>
checker = <rag.evaluator.faithfulness_checker.FaithfulnessChecker object at 0x0000022E3A8E74D0>

    @pytest.mark.xfail(
        strict=True,
        reason="issue #60: faithfulness checker crashes when a context chunk has text: None",
    )
    def test_none_context_chunk_text(self, checker):
        """Test handling of None in context chunk text."""
        feedback = "Has Python skills"
        context_chunks = [{"text": None}]

>       score = checker.check(feedback, context_chunks)
                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

tests\unit\test_faithfulness_checker.py:234:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

self = <rag.evaluator.faithfulness_checker.FaithfulnessChecker object at 0x0000022E3A8E74D0>
feedback = 'Has Python skills', context_chunks = [{'text': None}]

    def check(self, feedback: str, context_chunks: list[dict]) -> float:
        """Check faithfulness of feedback to context.

        Args:
            feedback: Generated feedback text
            context_chunks: Retrieved context chunks

        Returns:
            Faithfulness score 0.0-1.0 (ratio of supported claims)
        """
        if not feedback or not context_chunks:
            logger.info(
                "faithfulness_empty_input",
                has_feedback=bool(feedback),
                has_chunks=bool(context_chunks),
            )
            return 0.0

        # Extract key claims from feedback (sentences)
        claims = self._extract_claims(feedback)
        if not claims:
            logger.info("faithfulness_no_claims_extracted")
            return 0.5  # Default to neutral if no extractable claims

        # Concatenate context text
>       context_text = " ".join([chunk.get("text", "") for chunk in context_chunks])
                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
E       TypeError: sequence item 0: expected str instance, NoneType found

rag\evaluator\faithfulness_checker.py:38: TypeError
=========================== short test summary info ===========================
FAILED tests/unit/test_faithfulness_checker.py::TestFaithfulnessChecker::test_none_context_chunk_text
1 failed in 0.07s
----- STDERR
----- EXIT CODE: 1

----- COMMAND
.venv/Scripts/python.exe -c from rag.evaluator.faithfulness_checker import FaithfulnessChecker; FaithfulnessChecker().check('Knows Python.', [{'text': None}])
----- STDOUT
----- STDERR
Traceback (most recent call last):
  File "<string>", line 1, in <module>
    from rag.evaluator.faithfulness_checker import FaithfulnessChecker; FaithfulnessChecker().check('Knows Python.', [{'text': None}])
                                                                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\0051l\Downloads\pathreview-ai301-fa26-s1\rag\evaluator\faithfulness_checker.py", line 38, in check
    context_text = " ".join([chunk.get("text", "") for chunk in context_chunks])
TypeError: sequence item 0: expected str instance, NoneType found
----- EXIT CODE: 1
```

After (`issue60-after.txt`, reproduction part). The named test passes, the full file goes from
`18 passed, 4 xfailed` to `21 passed, 3 xfailed` (only the three issue #59 tests are still
xfailed), and the Unit 2 reproduction exits 0 and returns `0.0`:

```text
Issue #60 AFTER evidence (fix applied, uncommitted)
Recorded: 2026-10-05T05:23:20Z
Repo: /c/Users/0051l/Downloads/pathreview-ai301-fa26-s1
Branch: fix/60-none-context-text
Commit (HEAD; fix is uncommitted working-tree change): f89c06fc3ff292df2a04a39ac51319d32a76b779
Python: Python 3.14.5
Shell: Git Bash; commands run from repository root, exactly as shown
git status --short:
 M rag/evaluator/faithfulness_checker.py
 M tests/unit/test_faithfulness_checker.py
?? comment.md
?? plan.md
git diff --stat:
 rag/evaluator/faithfulness_checker.py   |  6 ++++--
 tests/unit/test_faithfulness_checker.py | 32 ++++++++++++++++++++++++++------
 2 files changed, 30 insertions(+), 8 deletions(-)

----- COMMAND
.venv/Scripts/python.exe -m pytest tests/unit/test_faithfulness_checker.py -q
----- STDOUT
..x...x......x..........                                                 [100%]
21 passed, 3 xfailed in 0.08s
----- STDERR
----- EXIT CODE: 0

----- COMMAND
.venv/Scripts/python.exe -m pytest tests/unit/test_faithfulness_checker.py::TestFaithfulnessChecker::test_none_context_chunk_text -q --runxfail
----- STDOUT
.                                                                        [100%]
1 passed in 0.03s
----- STDERR
----- EXIT CODE: 0

----- COMMAND
.venv/Scripts/python.exe -c "from rag.evaluator.faithfulness_checker import FaithfulnessChecker; FaithfulnessChecker().check('Knows Python.', [{'text': None}])"
----- STDOUT
2026-10-04 19:23:21 [info     ] faithfulness_checked           claims_count=1 score=0.0 supported_count=0
----- STDERR
----- EXIT CODE: 0

----- COMMAND
.venv/Scripts/python.exe -c "from rag.evaluator.faithfulness_checker import FaithfulnessChecker; print(FaithfulnessChecker().check('Knows Python.', [{'text': None}]))"
----- STDOUT
2026-10-04 19:23:21 [info     ] faithfulness_checked           claims_count=1 score=0.0 supported_count=0
0.0
----- STDERR
----- EXIT CODE: 0
```

The same after file also records the repository checks on the fixed tree. All of them exited
0: `ruff check .` gave "All checks passed!", `black --check .` gave "110 files would be left
unchanged.", mypy gave "Success: no issues found in 76 source files", and
`pytest tests/unit -v -m unit` gave "378 passed, 52 xfailed, 2 warnings".

## Eval iterations

Answer all four sections. Quote source text directly; paraphrase does not satisfy these
fields.

**Run history**

- Preflight attempts: these stopped because `rubric.md` had no checks yet. As designed, the
  skill refuses to grade without a rubric, so they produced no score.
- Run 1 (the first and only completed full eval; 2026-10-05T04:54:51Z, model sonnet):
  `agreement: 20/20 scored items  (bar: 18/20: PASS)`. Every category matched:
  `clear-accept 7/7  scope-creep 4/4  thread-convention 2/2  unbuildable 3/3  wrong-cause 4/4`.
  This is the committed `eval-run.txt`.

Kept separate from the eval scores: my live plan-check runs on my own issue #60 package. These
were verdicts, not agreement scores. The first live run stopped before grading because
`scope.md` still had its repo placeholder. The next gave `reject`, because "Honest risks and
unknowns" failed: my plan said the thread had no comments when it actually had 21. After I
corrected that, it gave `accept`. The final run on the completed plan, with Deviations, also
gave `accept`.

**Package analysis**

`pkg-04` (junegunn/fzf#4260, category thread-convention). My rubric decided `reject`, and the
gold label is `reject`, so they agree.

The candidate plan is "Scope: documentation only ... Not in scope: any change to fzf's input
handling code". It documents the `> /dev/tty` workaround, and the comment ends "I can have the
docs PR up this week." The thread highlights show the owner had already gone further: on
2025-03-03 junegunn said "This seems to be the culprit", pointing at `src/tui/light_windows.go`
(lines 70-84). The owner then "posted a patched test binary from commit 8916cbc and asked the
reporter to test it", and the reporter said it "pretty much solves it".

My rubric failed four required checks: "Approach addresses cause", "Observable regression
test", "Honest risks and unknowns", and "Thread and repository alignment". The deciding one
for this category is thread alignment. The grader's evidence says the maintainer is "actively
pursuing a code fix in src/tui/light_windows.go" and that the plan and comment "pivot to a
documentation-only approach without acknowledging or reconciling with that maintainer-driven
direction". That matches the gold note: "docs-only workaround plan whose comment never engages
the owner's explicit direction in-thread". "Diagnosis follows evidence" still passed, because
the plan's cause is correct; the plan fails on what it does with that cause, not on the cause
itself.

**Check rationale**

From `tools/plan-check/rubric.md`:

> | Thread and repository alignment | Candidate plan comment compared with Candidate plan, Thread highlights, and Repo facts. | The comment accurately represents the plan and follows applicable maintainer instructions and repository conventions, including AI disclosure when required. It does not misrepresent ownership or completed work. | required |

This check reads the comment, because the comment is what the thread actually sees. It
compares the comment against three sources, each catching a different failure:
- the plan, for a comment that promises something the plan does not;
- the thread highlights, for a comment that ignores maintainer direction, as in pkg-04;
- the repo facts, for conventions and AI policy.

The wording "applicable" and "when required" is deliberate. It stops the grader from inventing
requirements when a repo states no AI policy or the thread has no instructions; the evidence
guide says the same: "an empty thread alone is not a failure". The last sentence covers the
two ways a plan comment most often oversteps: claiming the issue as its own, and describing
planned work as done. The check is `required` because a correct plan posted with a misleading
comment is still not ready to post. I did not revise this check between runs. The only
completed eval used it as written and scored 20/20.

**Trade-offs**

This check can only be as good as the thread evidence it is given. In eval mode the bundle
supplies curated "Thread highlights". In live mode the grader has to fetch the thread itself,
and I hit that limit on my own issue. My first fetch of issue #60's web page returned no
comments, while the GitHub API showed 21. If the comment had relied on that empty thread, this
check would have graded the thread as having no instructions, and the "an empty thread alone
is not a failure" rule would have let it pass. In my run, "Honest risks and unknowns" was the
check that caught the error, because the plan itself stated "No comments were visible in the
thread". I accept that this check will miss maintainer direction the grader never fetched.
The procedure does not currently say how to cross-check a web fetch against the API; that is
a gap, not a fix I made.

Nothing changed elsewhere after the scored run, and here is how I know. There was only one
full eval, so no other package's result could have moved. The `rubric.md`, `procedure.md`,
`evidence-guide.md` and `SKILL.md` I uploaded have the same sha256 prefixes as the
fingerprints in the `eval-run.txt` header (`5050c9e1db265859`, `925412111e710829`,
`0d1618e6d14d898d`, `4688d0d0f4cf6cb3`). The one file I changed afterwards is `scope.md`: I
filled in the `Repo:` line for live mode. Eval mode ignores `scope.md`, and it is not among
the fingerprinted files.

---

Related paths: `plan.md` and `eval-run.txt` in this directory; your skill's files in
`tools/plan-check/`.
