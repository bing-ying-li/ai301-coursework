# Evidence guide: where evidence lives in a PR package

## Plan fidelity (harness category: silent-drift)

### Where it lives

In eval mode, read Issue and Thread highlights for the problem and
applicable directions. Read Plan context for the accepted approach,
scope, exclusions, affected files, reproduction evidence, test plan,
and any supplied deviation notes. Compare these with Candidate PR's
Diff, Commits, Title, and Description.

In live mode, read plan.md, including its Deviations section, alongside
the issue body and full thread. Compare the plan with the committed
change from git diff main...HEAD and commit history from
git log main..HEAD. Read the title and description in pr_draft.md
for claims about delivered behavior, completion, and limitations.

### What good looks like

Every material change is traceable to the plan or a documented
deviation explaining what changed and why. Material omissions and
changed outcomes are disclosed consistently in the plan and description.

Check both directions: extra implementation without a note and missing
planned work without a note are silent drift. A disclosed shortfall
does not fail fidelity merely because less than the original plan was
delivered. Compare claims with actual behavior: disclosure does not
support a claim that the diff or recorded results contradict.

In calib-01, Plan context names only themes.gitconfig and removal of
the first duplicate line. Candidate PR's Diff removes that exact line
and preserves the effective value described in the plan.

## Test evidence (harness category: not-tested)

### Where it lives

In eval mode, compare the reproduction and Test plan in Plan context
with Candidate PR's Test evidence. Use Issue for triggering inputs
and original behavior, Repo facts for applicable repository checks,
and Description for testing claims and disclosed limits.

In live mode, read test_evidence.md for before and after reproduction
steps, inputs, commands, outputs, regression tests, and local check
results. Compare these with plan.md's test plan, the issue's repro
evidence or supplied house repro pack, and the actual diff. Read the
PR template and docs/CONTRIBUTING.md for required checks, then compare
pr_draft.md's testing claims and checkboxes with the recorded outcomes.

### What good looks like

The evidence exercises the affected real code with the relevant trigger
and records an observable result that distinguishes the original failure
from the branch's behavior. Relevant regression checks and required
repository checks have actual recorded outcomes rather than promises
or an unsupported "tests pass".

A recorded failure is evidence, not a passing result. Assess it together
with the disclosed limit, the claims made, and the repository's policy.
For blocked checks, locate the attempted command and actual error.
Expected "no tests ran" and pending CI must be described accurately.
An omitted planned check needs a specific reason and coverage limit;
silently skipping required repository checks does not pass.

In calib-01, the strict parser's before result is DuplicateOptionError
and its after result is parsed OK. The git-config output verifies the
retained value, and the smoke-check result addresses the plan's
unchanged-rendering claim.

## Diff quality (harness category: unreviewable)

### Where it lives

In eval mode, inspect every hunk in Candidate PR's Diff and read its
Commits. Compare changed files and behavior with Issue and Plan context.
Use supplied code and repository facts where they explain whether a
supporting change is necessary.

In live mode, inspect the complete git diff main...HEAD and
git log main..HEAD. Use git diff main...HEAD --stat as an overview,
not a substitute for reading the hunks. Compare them with plan.md
and the issue to establish why each change belongs in the fix.

### What good looks like

The fix and directly necessary supporting work are visible without
unrelated edits obscuring them. Look for debug leftovers, obsolete
commented-out code, temporary files, accidental edits, unnecessary
formatting churn, and unrelated cleanup.

Judge relevance rather than line count or commit count. Necessary
refactoring can pass when its connection to the fix is established;
disclosing unrelated cleanup does not make it necessary.

In calib-01, the diff contains one deletion in the planned theme.
No other theme or unrelated file changes.

## Standards and comms (harness category: standards-wall)

### Where it lives

In eval mode, read Repo facts for PR template sections, contribution
instructions, required checks, branch conventions when supplied, and
AI-use policy. Read Thread highlights for explicit maintainer direction.
Compare these with Candidate PR's Title, Description, supplied branch
information, and Test evidence.

In live mode, read .github/PULL_REQUEST_TEMPLATE.md,
docs/CONTRIBUTING.md, the issue thread, and scope.md's house rules.
Compare them with pr_draft.md, test_evidence.md, and the current branch
name from git branch --show-current. Read voice-guide.md for personal
writing rules and report violations as directed by SKILL.md.

### What good looks like

Applicable template sections contain real information or justified N/A
entries; issue references are correct; testing checkboxes match the
evidence; and required AI-use disclosure describes the actual help.
Explicit maintainer directions and naming requirements are followed.

A reviewer can identify the problem, resulting behavior, validation,
and material limits. Judge clarity rather than length or decorative
formatting. A placeholder heading or generic boilerplate does not
satisfy a requirement for meaningful content.

Apply only the standards established by permitted sources. In
calib-01, Repo facts states that there is no PR template or stated AI
policy, so do not impose Path Review's template or AI disclosure on
that eval package. Its description references #2211 and explains the
bounded change. In live Path Review work, apply its actual template
and the course's required AI disclosure.

Check whether description claims match the diff under Plan fidelity
and Claims match the change; do not treat a behavioral contradiction
as merely a writing-style concern.