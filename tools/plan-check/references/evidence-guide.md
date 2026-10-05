# Evidence guide: where evidence lives in a plan package

## Diagnosis and grounding

Where it lives: In eval, compare the cause in Candidate plan with Issue, Repro evidence, and supplied code excerpts. In live mode, compare the diagnosis in plan.md with its quoted reproduction evidence and the issue context permitted by SKILL.md.

What good looks like: The cause explains the triggering input and observed failure without contradicting evidence. The approach addresses that cause. An uncertain cause has a concrete verification step before choosing the fix.

## Scope

Where it lives: In eval, inspect changes, exclusions, and affected files in Candidate plan against Issue. In live mode, inspect the equivalent statements in plan.md against the requested behavior.

What good looks like: The work is a bounded fix with directly necessary supporting changes. Unrelated cleanup, features, and changes to unaffected behavior are excluded.

## Executability

Where it lives: In eval, inspect files, components, approach, and work order in Candidate plan against Repo facts and supplied code. In live mode, inspect plan.md and repository facts available under SKILL.md.

What good looks like: Another contributor can identify where to start and what behavior to change. Critical decisions are explained or have concrete investigation steps. A complete patch is not required.

## Test plan

Where it lives: In eval, compare tests in Candidate plan with inputs, steps, commands, and output in Repro evidence. In live mode, compare tests in plan.md with the quoted Unit 2 reproduction.

What good looks like: The check exercises affected real code with the triggering input and states an observable result that distinguishes the fix from the original failure. Relevant existing behavior is checked for regressions. Planned results are not claimed as completed output.

## Honesty

Where it lives: In eval, inspect assumptions, risks, uncertainty, and claims in Candidate plan and Candidate plan comment against Repro evidence and Repo facts. In live mode, inspect diagnosis, risks, unknowns, and Deviations in plan.md and related claims in comment.md.

What good looks like: Material uncertainty has practical verification or mitigation. Claims do not exceed evidence. Recorded deviations explain what changed and why; a pre-build plan need not claim completed work.

## Comms

Where it lives: In eval, compare Candidate plan comment with Candidate plan, Thread highlights, and Repo facts, including contribution policies and AI disclosure requirements. In live mode, compare comment.md with plan.md, applicable issue-thread instructions, and repository contribution guidance.

What good looks like: The comment accurately represents the plan and follows applicable instructions and conventions. It includes AI disclosure when required and does not make unsupported claims about completed work or ownership. Do not invent requirements when none are stated; an empty thread alone is not a failure.
