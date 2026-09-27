# Rubric: is this reproduction package ready to post?

## Checks

| Check                  | Evidence                                                                         | Pass condition                                                                                                                                    | Weight    |
| ---------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Claim fit              | Claim comment compared with issue title and body                                 | Names the specific problem, says what I will investigate, and promises a report. Does not claim a result before testing or promise a fix or date. | required  |
| Environment            | Report's environment record compared with issue and repo facts                   | Gives relevant OS, Python or tool versions, code revision, and setup. Explains important differences from the issue's target.                     | required  |
| Repeatable steps       | Report's input and commands compared with issue steps                            | Another person can recreate the input and trigger the relevant behavior without guessing an important step.                                       | required  |
| Evidence matches issue | Report's actual output compared with expected and observed behavior in the issue | Output shows the specific reported problem, or a genuine attempt where it did not occur. An unrelated failure or bare assertion does not pass.    | required  |
| Honest conclusion      | Report conclusion compared with its commands and output                          | The claimed result is supported by the shown evidence, including an honest cannot-reproduce result. States expected versus actual behavior.       | required  |
| Repo conventions       | Repo-facts policy and template compared with claim and report                    | Meets stated contribution requirements, including AI disclosure if required, and supplies relevant requested diagnostics.                         | required  |
| Clear writing          | Claim and report text                                                            | Specific wording makes the evidence and next action easy to understand.                                                                           | preferred |

## Verdict rule

Accept only when every applicable required check passes. A fail or unclear on a required check means reject. Preferred checks never change the verdict. For a claim-only draft, mark Environment, Repeatable steps, Evidence matches issue, and Honest conclusion unclear with "not yet applicable: claim-only draft", and exclude them from the verdict.
