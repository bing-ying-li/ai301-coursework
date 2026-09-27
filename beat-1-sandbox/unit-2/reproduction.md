# Unit 2 — Claim and Reproduce

## Your identity upstream

**GitHub username**

bing-ying-li

## Posted upstream

**Claim comment**

https://github.com/codepath/pathreview-ai301-fa26-s1/issues/60#issuecomment-5852690258

Hi, I'd like to investigate the FaithfulnessChecker crash when a context chunk has text set to None. I'll run the example and named unit test locally, then report my environment, steps, and observed result here. I used AI assistance to draft this comment, and I'll verify the results myself.

**Reproduction comment**

https://github.com/codepath/pathreview-ai301-fa26-s1/issues/60#issuecomment-5852811806

## Reproduction of #60

I reproduced the `TypeError` when a context chunk contains `{"text": None}`.

**Environment**

- OS: Microsoft Windows NT 10.0.26200.0
- Repository: my fork of `codepath/pathreview-ai301-fa26-s1`
- Commit: `f89c06fc3ff292df2a04a39ac51319d32a76b779`
- Python 3.14.5, pytest 9.1.1, structlog 26.1.0
- I installed pytest and structlog in a local `.venv`. This isolated test did not need a database or application services.

**Steps and results**

From the repository root, I ran:

```powershell
.\.venv\Scripts\python.exe -m pytest tests/unit/test_faithfulness_checker.py -q
```

Output:

```text
..x...x......x....x...                             [100%]
18 passed, 4 xfailed in 0.25s
```

The test file includes `test_none_context_chunk_text`, marked as an expected failure for #60. I then ran the issue's example directly:

```powershell
.\.venv\Scripts\python.exe -c "from rag.evaluator.faithfulness_checker import FaithfulnessChecker; FaithfulnessChecker().check('Knows Python.', [{'text': None}])"
```

The relevant traceback was:

```text
File "rag\evaluator\faithfulness_checker.py", line 38, in check
    context_text = " ".join([chunk.get("text", "") for chunk in context_chunks])
TypeError: sequence item 0: expected str instance, NoneType found
```

**Expected:** The checker should handle the `None` text value and return a float score, as the named test expects.

**Observed:** The join receives `None` and raises `TypeError`.

I used AI assistance to draft this comment, but I ran these commands and verified the output myself.

## Eval iterations

**Run history**

- The first full attempt stopped with a Windows `cp1252` encoding error and produced no valid agreement score. I enabled UTF-8 mode with `set PYTHONUTF8=1`.
- Targeted `--only pkg-04` check: 1/1 agreement. This confirmed the encoding problem was fixed; a partial run does not decide the bar.
- First complete run: 20/20 scored items, all categories matched, PASS.
- Confirming complete run with `--save-run eval-run.txt`: 20/20 scored items, all categories matched, PASS. This is the harness-written run submitted in `eval-run.txt`.

**Package analysis**

For `pkg-04`, my rubric decided `reject` and the gold label was also `reject`. The candidate claim only says “+1 also seeing this” and asks for a fix. The report says the lines overflow but gives no OS, terminal size, input payload, command, or actual output from the author's environment. In particular, the issue depends on tabs in a multi-line payload and `fzf --read0 --query setcap`; the candidate does not supply a repeatable attempt. Environment, Repeatable steps, and Evidence matches issue therefore cannot pass, so the required-check verdict is reject.

**Check rationale**

My current `Evidence matches issue` check says:

> Output shows the specific reported problem, or a genuine attempt where it did not occur. An unrelated failure or bare assertion does not pass.

I chose this wording because a statement such as “I can confirm” is not itself proof. The output must match the behavior in the issue. The second clause allows an honest cannot-reproduce report when it includes a real attempt and its observed result.

**Trade-offs**

This check rejects reports that may describe a real bug but omit the actual output. `pkg-04` is one example: the author might truly have seen overflow, but the package offers only a claim, so another person cannot verify it. I accept that trade-off to keep the report independently checkable.

---

Related paths: `eval-run.txt` in this directory; the skill files in `tools/repro-check/`.
