# Rubric: is this a good first issue?

<!--
THIS IS THE PART YOU WRITE. The skill in SKILL.md executes whatever checks
you define here. It ships empty on purpose: the judgment is your work.

A filled rubric must contain:

1. At least one row in the checks table. Each row needs all four columns:
   - Check: a short name (used in the output JSON).
   - Evidence: exactly what to look at, and where. Name the source
     (repo-facts block, issue body, comment thread, or the locations in
     references/evidence-guide.md). "The repo" is not a source; "the last
     5 default-branch commit dates" is.
   - Pass condition: a condition someone else could apply and get your
     answer. Prefer thresholds with numbers ("a maintainer commented
     within 30 days") over adjectives ("maintainer is responsive").
   - Weight: `required` (a fail here rejects the issue) or `preferred`
     (never changes the verdict; a nice-to-have that helps rank the
     issues you accept).

2. A verdict rule below the table: how the check grades combine into
   accept or reject, including how `unclear` is treated. The verdict
   space is binary. If you write no rule for `unclear`, the skill treats
   it as fail.

Cover what actually kills first contributions. The lecture named four
families: the maintainer is alive, the repo is in use, the scope fits a
newcomer, and nobody else is already on it. A rubric that ignores a family
will fail eval issues designed around that family.
-->

## Checks

| Check                          | Evidence                                                                                                                                               | Pass condition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Weight    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Maintainer active              | Repo-facts block: last 5 default-branch commit dates and authors, plus the maintainer first-response sample; issue comment thread author associations. | Pass if there is at least one non-bot default-branch commit within 90 days of the capture date, or a maintainer with Owner, Member, or Collaborator status responded within 30 days in the response sample or current issue thread.                                                                                                                                                                                                                                                                                                                                                                                                                                   | required  |
| Repository active              | Repo-facts block: archived status, last push to any branch, and latest release date.                                                                   | Pass if the repository is not archived and its last push was within 180 days of the capture date. A recent release is supporting evidence but is not required.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | required  |
| Newcomer-sized scope           | Issue body and comment thread, including acceptance criteria, maintainer clarification, linked attempts, and design discussion.                        | Pass if the issue asks for one bounded outcome that can be implemented and tested. A coordinated change across several files, a list of related steps, possible causes, or optional suggestions may still pass. Fail if it is explicitly an umbrella or tracking issue, a pure usage question, a maintainer says it requires changes to core internals, or the thread contains an unresolved design debate with no maintainer decision. Also fail when the history shows at least two closed unmerged pull requests or repeated accepted claims followed by inactivity or unassignment, indicating that the work is persistently unsuitable for a first contribution. | required  |
| Issue available                | Repo-facts block: this issue's assignees and linked PR states; issue comment thread for claim comments and PR mentions.                                | Pass if the issue has no assignee, no open linked or mentioned pull request, and no active claim confirmed by a maintainer. A closed unmerged pull request or an unanswered request to work on the issue does not fail this check by itself.                                                                                                                                                                                                                                                                                                                                                                                                                          | required  |
| Contribution policy compatible | Repo-facts block: contribution policy; CONTRIBUTING.md, dedicated AI policy files, and relevant issue or pull-request templates listed there.          | Pass if the repository is silent about AI use or permits it with conditions such as disclosure, testing, understanding, or human review. Fail only when the policy explicitly bans AI-generated or AI-assisted contributions.                                                                                                                                                                                                                                                                                                                                                                                                                                         | required  |
| Helpful first-issue signals    | Issue body, labels, and comment thread.                                                                                                                | Pass if the issue has a good-first-issue or equivalent newcomer label, concrete acceptance criteria, reproduction details, or maintainer guidance. Otherwise mark unclear; this check only helps rank accepted issues.                                                                                                                                                                                                                                                                                                                                                                                                                                                | preferred |

## Verdict rule

Accept an issue only when every required check passes. Reject it if any required check fails or is unclear. Preferred checks never change an accept or reject verdict; they are used only to rank accepted issues. An unclear preferred check counts as not preferred but does not reject the issue.
