# Unit 4 — Test and Submit

## Your pull request

**Pull request**

https://github.com/codepath/pathreview-ai301-fa26-s1/pull/148

**Branch**

fix/60-none-context-text

## Eval iterations

**Run history**

1. Initial 20-package attempt: 15/19 successfully graded packages agreed.
   pkg-05 had a Windows cp1252 UnicodeEncodeError, so the harness marked
   the run partial and did not save eval-run.txt.
2. Encoding retry with --only pkg-05 and Python UTF-8 mode: 1/1 agreed.
3. Diagnostic partial run on pkg-08,pkg-11,pkg-16,pkg-19: 1/4 agreed.
4. After revising evidence interpretation, a partial run on
   pkg-01,pkg-03,pkg-04,pkg-08,pkg-11,pkg-12,pkg-16,pkg-19:
   7/8 agreed.
5. Final complete run: 18/20 scored items agreed, PASS.
   This is the run saved in eval-run.txt.

The final category results were clear-accept 5/7, not-tested 4/4,
silent-drift 4/4, standards-wall 2/2, and unreviewable 3/3.
Every category had at least one match.

**Package analysis**

Package: pkg-08.

In the diagnostic run, my rubric returned reject while the gold label
was accept. The grader treated the absence of a plan from Thread
highlights as evidence against the description's statement that the
plan was posted. It also required a formatter command for the
description's "code formatted" statement.

The package's Plan context explicitly introduces:

"The accepted plan this PR claims to implement, excerpted from the
posted plan (with the repro evidence it built on):"

Its description states:

"Requirements: cheatsheets regenerated (no binding changes, no diff);
code formatted; integration test added; new error text
internationalised; no UserConfig changes."

The test evidence also reports:

"Integration test
`stash_untracked_only_errors` passes; `go test ./...` passes;
`go generate ./...` produces no cheatsheet diff."

I revised the interpretation rules to recognize that Thread highlights
are excerpts and that a formatting checklist does not automatically
require a separate formatter transcript. The shown diff and test
evidence support the bounded guard, error message, and regression test.

In the revised partial run and the final full run, my rubric returned
accept for pkg-08, matching the gold label.

**Check rationale**

The following check is quoted exactly from my uploaded rubric:

| Repository check evidence | Recorded check commands and results compared with the testing requirements in Repo facts or the repository's PR template and contributing guide. | Every applicable required local check has a recorded command and actual outcome, or a concrete attempted-run blocker with its output and coverage limit disclosed. Failed checks are reported with the available explanation, without inventing a cause. Expected "no tests ran" output is reported accurately. Required checks silently skipped or merely promised fail. Pending CI is not treated as a completed local check or a failure unless stated policy requires it before submission. | required |

I kept this check required because a claim that testing happened is
not enough when required checks were silently skipped. It distinguishes
missing evidence from a recorded failed command and prevents a failed
check from being presented as a pass.

After the diagnostic run, I added this interpretation rule:

"A formatting checklist can be satisfied by an explicit
completion statement unless the policy requires a formatter command
or log. Do not invent a missing command requirement."

This clarifies the boundary between template completion and executable
check evidence. It avoids demanding logs the repository did not ask for
while retaining the requirement to report actual outcomes for required
checks.

**Trade-offs**

Accepting concise recorded outcomes and treating diffs and thread
highlights as excerpts makes the rubric less strict about missing
incidental details. It could miss an inaccurate completion statement
when the bundle contains no evidence contradicting it. I accept that
limit rather than reconstructing omitted repository internals or
inventing requirements.

I re-ran canaries from all four rejection categories:
pkg-01 (standards-wall), pkg-03 (silent-drift), pkg-04 (not-tested),
and pkg-12 (unreviewable). All remained reject and matched their gold
labels in the revised partial run.

The final full run matched every reject package, but falsely rejected
pkg-13 and pkg-16. The revisions improved pkg-08 and pkg-11 without
eliminating every false rejection. I retained these limitations and
submitted the complete 18/20 run rather than adding package-specific
exceptions.