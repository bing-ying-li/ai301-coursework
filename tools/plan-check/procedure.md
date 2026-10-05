# Procedure: how this skill grades a plan package

## Read order

1. Read rubric.md and references/evidence-guide.md.
2. In eval mode, use only the package and ignore scope.md and voice-guide.md. In live mode, follow SKILL.md and confirm repository scope.
3. Read Issue and Repro evidence first. Record inputs, steps, expected behavior, actual output, and established facts.
4. Read Thread highlights and Repo facts for applicable instructions and conventions.
5. Read Candidate plan and Candidate plan comment, or plan.md and comment.md in live mode.

## Evidence gathering

1. Diagnosis follows evidence: compare the cause with reproduction output and supplied code.
2. Bounded scope: record changes, exclusions, affected files, and their connection to the issue.
3. Approach addresses cause: identify how the fix prevents the failure or how investigation verifies the cause first.
4. Executable approach: record starting components, behavior changes, and concrete steps; compare with repository facts.
5. Observable regression test: record triggering inputs, real code paths, commands or procedures, expected results, and relevant regression coverage.
6. Honest risks and unknowns: record material assumptions, uncertainty, and verification or mitigation.
7. Thread and repository alignment: compare the comment with the plan, thread instructions, and repository conventions.
8. Record missing evidence without inventing facts or results.

## Check execution

1. Grade every rubric row in order as pass, fail, or unclear.
2. Apply its pass condition to evidence, judging substance rather than headings or length.
3. Use pass when evidence establishes the condition; fail when it demonstrates a contradiction or unmet requirement; unclear when missing evidence prevents a decision.
4. Accept equivalent evidence wherever it appears. Assess concrete investigation steps for uncertain causes.
5. Explain each grade with a quote or source location. For missing evidence, identify the source inspected and what is needed.
6. Complete every check even after a required failure.

## Verdict assembly

1. Apply the verdict rule in rubric.md.
2. Accept only when every required check passes. Required fail or unclear means reject; preferred checks do not affect the verdict.
3. Explain deciding checks and revisions needed. Do not claim completed implementation or testing without evidence.
4. Finish with the exact JSON schema required by SKILL.md. Written and JSON verdicts must agree.
