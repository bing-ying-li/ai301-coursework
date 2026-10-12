# Rubric: is this pull request ready to submit?

## Checks

| Check | Evidence | Pass condition | Weight |
|---|---|---|---|
| Plan fidelity and disclosed deviations | The candidate diff and changed files compared with the plan's implementation, boundaries, and deviation notes; the description's account of departures. | Every material implemented change follows the plan or a documented deviation explaining what changed and why. Material omissions or changed outcomes are disclosed consistently in the plan and description. An honestly disclosed shortfall does not fail this check solely because the original plan was not fully delivered. Silent additions, omissions, or contradictory fidelity claims fail. | required |
| Claims match the change | The candidate title, summary, changes, and testing claims compared with the actual diff, issue, and recorded results. | The description accurately states the behavior delivered and its limits. Claims of fixing, testing, compatibility, or completion are supported by the artifacts. Known failures and unimplemented behavior are not represented as successful or complete. | required |
| Observable reproduction and regression evidence | The before and after reproduction steps, inputs, commands, outputs, and relevant tests compared with the issue's triggering behavior and the plan's test plan. | Evidence exercises the affected real code with the relevant trigger and records an observable before and after result. Relevant planned regression checks have recorded outcomes, or omitted checks have a specific disclosed reason and an explanation of the resulting coverage limit. Assertions such as "works now", tests that bypass the affected behavior, or only a promised future test do not establish evidence. A recorded failed or partial outcome can pass when its limits are honestly disclosed and the description makes no unsupported success claim. | required |
| Repository check evidence | Recorded check commands and results compared with the testing requirements in Repo facts or the repository's PR template and contributing guide. | Every applicable required local check has a recorded command and actual outcome, or a concrete attempted-run blocker with its output and coverage limit disclosed. Failed checks are reported with the available explanation, without inventing a cause. Expected "no tests ran" output is reported accurately. Required checks silently skipped or merely promised fail. Pending CI is not treated as a completed local check or a failure unless stated policy requires it before submission. | required |
| Focused and reviewable diff | All changed files and hunks compared with the issue, plan, necessary supporting changes, and repository conventions. | The diff contains only the issue's change and directly necessary supporting work. No unrelated cleanup, temporary artifacts, accidental edits, debug output, or obsolete commented-out code obscures review. Necessary refactoring is justified by the fix. Disclosure does not make unrelated work pass. Judge relevance and clarity rather than line count or number of commits. | required |
| Repository standards and disclosure | The candidate description and branch information compared with the template and policy in Repo facts or the live repository sources. | Applicable template sections contain meaningful information or a justified N/A; the correct issue is linked; supplied branch information follows required naming rules; and required AI-use disclosure explains the actual assistance. Testing boxes match the evidence. Explicit repository requirements are met, including any stated exception. Do not invent requirements absent from the supplied standards. | required |
| Reviewer clarity | The title and description compared with the issue, diff, results, and disclosed limitations. | A reviewer can identify the problem, resulting behavior, validation, and material limitations without resolving contradictions or guessing what changed. Concise writing is sufficient; extra length, screenshots, or repeated explanation are not required unless the repository asks for them. | preferred |

## Verdict rule

Run every check and assign pass, fail, or unclear to each one.

Return accept only when every required check passes.
Return reject when any required check fails or is unclear.
Preferred checks never change the verdict.

Use fail when evidence establishes a violation or an explicitly required
artifact is missing. Use unclear when available evidence is insufficient
or ambiguous and does not establish either compliance or a violation.
For verdict assembly, unclear counts as fail for required checks.

Judge readiness from the actual package, not from its polish or whether
it delivered every original ambition. An honestly disclosed shortfall
can pass the fidelity and claims checks; it does not excuse unrelated
changes, unsupported claims, absent observable testing, or unmet
explicit repository requirements.

A failing command is not the same as missing test evidence. Assess its
recorded outcome, the disclosed limit, the claims made, and any explicit
repository policy. Do not require all checks to pass unless the stated
policy makes that a submission requirement.

In live mode, use plan.md, its Deviations section, git diff main...HEAD,
pr_draft.md, test_evidence.md, the issue thread, and repository standards.
In eval mode, use only equivalent evidence in the supplied bundle.

## Evidence interpretation

- Evaluate material behavioral and scope claims. Minor shorthand about
  function counts or test organization is a reviewer-clarity concern
  unless it hides a substantive change or materially overstates coverage.

- Treat Plan context as evidence of the accepted posted plan. Thread
  highlights are selected excerpts; a plan absent from those highlights
  is not evidence that no plan was posted.

- Read supplied diff excerpts for their shown changes. Do not infer
  hidden changes or missing evidence solely from abbreviated context,
  hunk line counts, omitted imports, or absent unchanged code.
  Reject substantive contradictions actually established by the bundle.

- Do not infer the behavior of an omitted helper, caller, error formatter,
  or exit-code constant from outside knowledge. A recorded transcript
  is not contradicted merely because the excerpt does not show every
  step that produces it. Visible code that directly contradicts the
  reported behavior remains grounds for failure.

- Accept a named command or test with a concrete recorded outcome as
  evidence; a full raw log is not required unless the stated policy asks
  for one. Detailed before/after behavior is still required to establish
  the relevant reproduction.

- Distinguish template completion requirements from required executable
  checks. A formatting checklist can be satisfied by an explicit
  completion statement unless the policy requires a formatter command
  or log. Do not invent a missing command requirement.