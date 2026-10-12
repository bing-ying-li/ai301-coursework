# Procedure: how this tool grades a PR package

## Read order

1. Identify live or eval mode from the request. In live mode, read
   scope.md before any submission evidence. Stop without grading if
   the repository is outside scope or the Repo line is unfinished.
   In eval mode, ignore scope.md and voice-guide.md and use only the
   supplied bundle as artifact evidence.

2. Read rubric.md and references/evidence-guide.md. Confirm that the
   rubric contains authored checks and this procedure contains authored
   steps. If either is unfinished, refuse to grade rather than inventing
   checks or steps. In live mode, also read voice-guide.md.

3. Read the issue and reproduction context first. Record the triggering
   input, original failure, intended behavior, and relevant thread
   instructions. Read the repository standards: the supplied Repo facts
   in eval mode, or the PR template and docs/CONTRIBUTING.md in live mode.

4. Read the plan before the diff. Record its intended behavior,
   implementation steps, affected files, exclusions, test plan, and
   documented deviations. For a house-chain submission, use the supplied
   house plan and house repro pack.

5. Read the complete candidate diff and supplied commit information.
   In live mode, obtain the committed diff with git diff main...HEAD
   from the working copy and inspect git log main..HEAD. Record every
   changed file and material behavior change. Do not count uncommitted
   edits as part of the candidate PR.

6. Read the test evidence. Record reproduction commands and outputs,
   regression checks, repository checks, failures, blockers, and the
   versions or branches identified by the evidence.

7. Read the candidate title and description last. Compare their claims
   with the independently recorded plan, diff, and results. This order
   prevents the description from substituting for artifact evidence.

## Evidence gathering

1. Plan fidelity and disclosed deviations: pair each material diff
   change with the relevant plan step or deviation note. Identify planned
   work that is absent from the diff. For departures, record what changed,
   why, and whether the description and plan disclose it consistently.

2. Claims match the change: list material claims in the title,
   summary, changes, and testing sections. Pair each claim with the diff
   or recorded result that supports or contradicts it. Record any claimed
   completion that exceeds the delivered behavior.

3. Observable reproduction and regression evidence: compare the issue
   trigger and plan's test plan with the actual inputs, commands, real
   code paths, and before and after outputs. Record whether the evidence
   distinguishes the original failure from the branch's behavior.
   Identify omitted checks, their disclosed reasons, and coverage limits.

4. Repository check evidence: list the applicable local checks required
   by the supplied standards. Pair each with its recorded command and
   outcome. For a blocker, record the attempted command, actual error,
   and disclosed limit. Distinguish failed checks, expected no-tests
   outcomes, pending CI, and checks that were never attempted.

5. Focused and reviewable diff: inspect every changed file and hunk for
   its connection to the issue. Record necessary supporting changes,
   unrelated cleanup, debug output, temporary artifacts, accidental
   edits, and obsolete commented-out code. Do not judge by diff size alone.

6. Repository standards and disclosure: list each applicable template
   and policy requirement, then locate the corresponding description
   content, issue link, supplied branch name, and AI-use disclosure.
   Compare testing checkboxes with recorded outcomes. Accept justified
   N/A entries where the stated standards allow them.

7. Reviewer clarity: locate the problem, resulting behavior, validation,
   and material limitations in the outgoing text. Record contradictions
   or omissions that force the reviewer to guess.

8. In live mode, compare the title and description with voice-guide.md.
   Quote any broken rule and the affected draft text for the summary.
   Do not let voice notes independently change the verdict.

9. Record evidence using a short quote or precise source location.
   For missing evidence, name the inspected source and the absent fact.
   Accept equivalent evidence wherever it appears within permitted
   sources; do not invent facts, commands, outputs, or explanations.

## Check execution

Apply rubric.md's Evidence interpretation rules before grading.
Distinguish an actual contradiction from details omitted by a supplied
excerpt. Do not reconstruct missing repository internals or demand
raw logs and commands that the stated standards do not require.

1. Execute every rubric row in its listed order. Do not stop after the
   first required failure.

2. Apply the row's written pass condition to its gathered evidence.
   Use pass when the evidence establishes the condition, fail when it
   establishes a violation or an explicitly required artifact is absent,
   and unclear when ambiguity prevents either conclusion.

3. Distinguish an honestly disclosed shortfall from silent drift.
   Disclosure can establish fidelity and honest claims, but does not
   excuse unrelated work, missing observable testing, or an unmet
   explicit repository requirement.

4. Distinguish a recorded failed command from missing evidence.
   Assess the actual outcome, disclosure, claims, and applicable policy.
   Do not invent an all-checks-must-pass requirement.

5. Give each check one decisive evidence line. When evidence conflicts,
   identify the contradiction and use the actual diff or recorded result
   to assess claims rather than accepting unsupported prose.

6. Reuse gathered evidence when sufficient. Re-read the relevant source
   if a material conflict remains; do not re-read the entire package
   merely to repeat a completed comparison.

7. Report any necessary step this procedure does not define. Do not
   silently invent a replacement workflow. Grade resulting uncertainty
   under the rubric's verdict rule.

## Verdict assembly

1. Apply the verdict rule in rubric.md without adding new requirements.
   Return accept only when every required check passes. Any required
   fail or unclear produces reject. Preferred grades do not affect it.

2. For reject, identify the first required check in rubric order graded
   fail or unclear as the deciding check. Quote its decisive evidence
   in the summary, then briefly identify other required problems and
   the evidence or correction needed.

3. For accept, state that all required checks passed. Include any
   preferred concerns, disclosed limitations, procedure gaps, and
   live-mode voice notes without creating a third verdict.

4. Use the existing PR URL as item when available. For an unopened
   draft, use the supplied issue URL and label it as a draft identifier
   in the summary. In eval mode, use the bundle id.

5. End with the exact fenced JSON schema in SKILL.md. Include every
   rubric check in order, its grade and evidence, and the final verdict.
   Keep the readable summary and JSON consistent. Emit nothing after
   the JSON block.