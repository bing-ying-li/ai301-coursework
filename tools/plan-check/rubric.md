# Rubric: is this plan ready to post and build from?

## Checks

| Check | Evidence | Pass condition | Weight |
|---|---|---|---|
| Diagnosis follows evidence | The stated cause in Candidate plan compared with Repro evidence and supplied code excerpts. | The diagnosis explains the reproduced behavior without contradicting evidence. An unverified cause is identified as a hypothesis with a concrete verification step. | required |
| Bounded scope | Proposed changes, exclusions, and affected files in Candidate plan compared with Issue. | Work is limited to the reported problem and directly necessary supporting changes. Unrelated cleanup and features are excluded. | required |
| Approach addresses cause | The proposed implementation compared with the diagnosis and Repro evidence. | The approach addresses the supported cause rather than hiding the symptom. If the cause is uncertain, verification comes before choosing the fix. | required |
| Executable approach | Affected files and implementation steps in Candidate plan compared with Repo facts and supplied code. | Another contributor can identify where to start and what behavior to change. Critical decisions are explained or have concrete investigation steps. | required |
| Observable regression test | Tests in Candidate plan compared with reproduction inputs, steps, commands, and output. | A check exercises affected real code with the triggering input and states an observable expected result distinguishing the fix from the original failure. Relevant existing behavior is checked for regressions. | required |
| Honest risks and unknowns | Assumptions, risks, and unknowns in Candidate plan and Candidate plan comment compared with Repro evidence and Repo facts. | Material uncertainty has concrete verification or mitigation. Unsupported assumptions are not presented as established facts. | required |
| Thread and repository alignment | Candidate plan comment compared with Candidate plan, Thread highlights, and Repo facts. | The comment accurately represents the plan and follows applicable maintainer instructions and repository conventions, including AI disclosure when required. It does not misrepresent ownership or completed work. | required |

## Verdict rule

Return accept only when every required check passes.
Return reject when any required check fails or is unclear.
Use unclear when supplied evidence is insufficient to decide.
Preferred checks, if added, do not change the verdict.
Judge substance rather than length, headings, or formatting.
In live mode, use the equivalent evidence locations in plan.md, comment.md, and sources permitted by SKILL.md and the evidence guide.
