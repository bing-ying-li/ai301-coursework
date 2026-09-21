# Unit 1 — Issue Selection

## Selected issue

**Issue link**

https://github.com/codepath/pathreview-ai301-fa26-s1/issues/60

**Verdict output**

Shared repo-level facts (apply to all three): last non-bot commit on main 2026-09-16 by Andrew Burke (4 days ago); not archived, last push 2026-09-16; docs/CONTRIBUTING.md exists and says nothing about AI, no AI_POLICY.md, PR template has no AI restriction; the repo has zero pull requests in any state, so nothing is linked or mentioned anywhere.

Accepted, in fit order

1. #60 — Faithfulness checker crashes when a context chunk has text: None
   The best fit: the only one carrying a good first issue label, a copy-pasteable four-line repro with the exact TypeError, and a fix confined to one .get("text", "") call. Pure Python debugging with a named failing test — it lives under rag/ but needs no ML knowledge at all, which matches your "avoid advanced ML" preference while still hitting Python + debugging + pytest.

2. #65 — review_service unit tests misconfigure async mocks
   Squarely on your testing goal, and the maintainer already prescribes the approach (AsyncMock for execute, MagicMock for the result object), so requirements are clear. Ranked below #60 only because async mock semantics are a step up and it touches 13 tests rather than one line.

3. #55 — Skill extractor fails to detect JavaScript and TypeScript
   Plain Python string/pattern work in a single file, no async, no ML. Last on fit because the requirements are the loosest of the three — "JavaScript or TypeScript described any other way" leaves you to derive the expected behavior from the five named failing tests rather than from the issue text.

Rejected

None.

Check grid

| Check                                   | #55  | #60  | #65  |
| --------------------------------------- | ---- | ---- | ---- |
| Maintainer active                       | pass | pass | pass |
| Repository active                       | pass | pass | pass |
| Newcomer-sized scope                    | pass | pass | pass |
| Issue available                         | pass | pass | pass |
| Contribution policy compatible          | pass | pass | pass |
| Helpful first-issue signals (preferred) | pass | pass | pass |

One note on the rubric, not on the run: #55 passes Newcomer-sized scope correctly under the clause allowing "a coordinated change across several files… or optional suggestions," since it names three sibling functions in one file. If you want tighter scoping for a first issue, that's a rubric edit, not a grading exception.

```json
[
  {
    "item": "https://github.com/codepath/pathreview-ai301-fa26-s1/issues/60",
    "checks": [
      {
        "name": "Maintainer active",
        "grade": "pass",
        "evidence": "Last default-branch commit 2026-09-16 by Andrew Burke (non-bot), 4 days before capture date 2026-09-20; issue opened by Aburke225 with author_association COLLABORATOR."
      },
      {
        "name": "Repository active",
        "grade": "pass",
        "evidence": "API repo record: archived=False, pushed_at=2026-09-16T21:48:27Z (4 days); no releases, which the rubric treats as non-required."
      },
      {
        "name": "Newcomer-sized scope",
        "grade": "pass",
        "evidence": "One bounded outcome: \"check() builds the context with chunk.get(\\\"text\\\", \\\"\\\")... the subsequent \\\" \\\".join(...) raises TypeError\" with one named covering test."
      },
      {
        "name": "Issue available",
        "grade": "pass",
        "evidence": "assignees empty, comments=0, timeline shows only 4 'labeled' events, and the repo has zero pull requests in any state."
      },
      {
        "name": "Contribution policy compatible",
        "grade": "pass",
        "evidence": "docs/CONTRIBUTING.md and .github/PULL_REQUEST_TEMPLATE.md contain no mention of AI; no AI_POLICY.md present — silence passes."
      },
      {
        "name": "Helpful first-issue signals",
        "grade": "pass",
        "evidence": "Labels include 'good first issue'; body has a runnable repro snippet plus the exact observed TypeError."
      }
    ],
    "verdict": "accept"
  },
  {
    "item": "https://github.com/codepath/pathreview-ai301-fa26-s1/issues/65",
    "checks": [
      {
        "name": "Maintainer active",
        "grade": "pass",
        "evidence": "Last default-branch commit 2026-09-16 by Andrew Burke (non-bot), 4 days before capture date 2026-09-20; issue opened by Aburke225 with author_association COLLABORATOR."
      },
      {
        "name": "Repository active",
        "grade": "pass",
        "evidence": "API repo record: archived=False, pushed_at=2026-09-16T21:48:27Z (4 days)."
      },
      {
        "name": "Newcomer-sized scope",
        "grade": "pass",
        "evidence": "One bounded outcome confined to tests/unit/test_review_service.py: \"Rework the mock setup (e.g. AsyncMock for execute, MagicMock for the result object) so the existing CRUD tests actually run.\" No umbrella framing, no design debate, no closed unmerged PRs."
      },
      {
        "name": "Issue available",
        "grade": "pass",
        "evidence": "assignees empty, comments=0, timeline shows only 3 'labeled' events, and the repo has zero pull requests in any state."
      },
      {
        "name": "Contribution policy compatible",
        "grade": "pass",
        "evidence": "docs/CONTRIBUTING.md and .github/PULL_REQUEST_TEMPLATE.md contain no mention of AI; no AI_POLICY.md present — silence passes."
      },
      {
        "name": "Helpful first-issue signals",
        "grade": "pass",
        "evidence": "No newcomer label, but the body gives a repro command (`pytest tests/unit/test_review_service.py -q`), observed output (13 failed, 6 passed), and maintainer guidance on the fix approach."
      }
    ],
    "verdict": "accept"
  },
  {
    "item": "https://github.com/codepath/pathreview-ai301-fa26-s1/issues/55",
    "checks": [
      {
        "name": "Maintainer active",
        "grade": "pass",
        "evidence": "Last default-branch commit 2026-09-16 by Andrew Burke (non-bot), 4 days before capture date 2026-09-20; issue opened by Aburke225 with author_association COLLABORATOR."
      },
      {
        "name": "Repository active",
        "grade": "pass",
        "evidence": "API repo record: archived=False, pushed_at=2026-09-16T21:48:27Z (4 days)."
      },
      {
        "name": "Newcomer-sized scope",
        "grade": "pass",
        "evidence": "One outcome — broaden detection in ingestion/parsers/skill_extractor.py so five named xfailed tests pass; three sibling functions in one file is the rubric's allowed 'coordinated change', and there is no umbrella framing, design debate, or core-internals statement."
      },
      {
        "name": "Issue available",
        "grade": "pass",
        "evidence": "assignees empty, comments=0, timeline shows only 3 'labeled' events, and the repo has zero pull requests in any state."
      },
      {
        "name": "Contribution policy compatible",
        "grade": "pass",
        "evidence": "docs/CONTRIBUTING.md and .github/PULL_REQUEST_TEMPLATE.md contain no mention of AI; no AI_POLICY.md present — silence passes."
      },
      {
        "name": "Helpful first-issue signals",
        "grade": "pass",
        "evidence": "No newcomer label, but the body names the exact file and function plus a reproduction command and five specific failing tests."
      }
    ],
    "verdict": "accept"
  }
]
```

---

## Eval iterations

**Run history**

- `agreement: 17/20 scored items (bar: 18/20: below the bar)`
- `agreement: 20/20 scored items (bar: 18/20: PASS)`
- `agreement: 19/20 scored items (bar: 18/20: PASS)` — final saved run recorded in `eval-run.txt`

Before the scored runs completed, I also had technical setup attempts that errored because Claude Code was not installed, authentication was not configured, and Windows was not using UTF-8. Those attempts produced no valid agreement score.

**Issue analysis**

`issue-15`: My final rubric decided `reject`, and the gold label was also `reject`. The issue initially appeared suitable because it had a `good first issue` label, no current assignee, and no open pull request. However, its history showed at least two closed unmerged pull requests and repeated accepted claims that ended in inactivity or automatic unassignment. Under the revised `Newcomer-sized scope` check, that repeated history indicated that the work was persistently more difficult than it first appeared, so the required check failed and the overall verdict was `reject`.

**Check rationale**

Current wording from my rubric:

> **Newcomer-sized scope** — Evidence: “Issue body and comment thread, including acceptance criteria, maintainer clarification, linked attempts, and design discussion.”
>
> Pass condition: “Pass if the issue asks for one bounded outcome that can be implemented and tested. A coordinated change across several files, a list of related steps, possible causes, or optional suggestions may still pass. Fail if it is explicitly an umbrella or tracking issue, a pure usage question, a maintainer says it requires changes to core internals, or the thread contains an unresolved design debate with no maintainer decision. Also fail when the history shows at least two closed unmerged pull requests or repeated accepted claims followed by inactivity or unassignment, indicating that the work is persistently unsuitable for a first contribution.”
>
> Weight: `required`

I wrote this check to distinguish a genuinely unbounded issue from a bounded task that simply contains several related steps. The first version was too strict and rejected `issue-01` and `issue-19`. I revised it so coordinated multi-file changes, possible causes, and optional suggestions can still pass while repeated abandoned attempts remain a warning that the real difficulty may be unsuitable for a first contribution.

**Trade-offs**

This check changed `issue-15` from `accept` to `reject` because it had multiple closed unmerged pull requests and repeated abandoned claims. I re-ran `issue-01`, `issue-15`, and `issue-19` as canaries after revising the wording, and all three then matched their gold labels. The trade-off is that the history rule may reject an otherwise manageable issue when earlier contributors abandoned it for personal reasons rather than technical difficulty. It also does not catch every difficult case: the final saved run accepted `issue-20` while its gold label was `reject`, leaving the final score at 19/20.

---

## Selection rationale

**Selection rationale**

1. Issue #60 fits my interests and available time because it is a small Python debugging task with one clear failure and a named pytest test. I have previous experience with Python and pytest, and the issue does not require advanced machine-learning knowledge even though the file is in the RAG area.

2. The verdict correctly identified that the repository is active, the issue is unclaimed, the contribution policy does not prohibit AI-assisted work, and the task has a bounded fix with clear reproduction evidence. Beyond the rubric, I also weighed how quickly I could understand the bug and verify the change. The `None` handling problem is easier for me to reason about confidently than the broader detection rules in #55 or the async mocking work in #65.

3. I expect claiming the issue to be straightforward because it currently has no assignee, comments, or pull requests. The Path Review classroom rules also allow shared issues, so another student's claim would not prevent me from carrying it into Unit 2. I will wait for Unit 2 before posting any claim comment.

---

Related paths: `eval-run.txt` in this directory; your skill's files in
`tools/issue-select/`.
