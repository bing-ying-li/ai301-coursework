# Evidence guide: where proof lives

## Environment

In an eval package, read the issue context, repo-facts block, and the repro report's environment details. In live mode, read the GitHub issue, repository setup docs, and my draft report. Look for the relevant OS, Python and tool versions, code revision, and dependencies. If the environment differs from the issue's target, the report should say so.

## Steps

In an eval package, compare the issue's steps with the report's starting state, input, and commands. In live mode, compare the GitHub issue with my draft. A reader should be able to create the same input and run the trigger without guessing an important step or needing a private file.

## Behavior shown

In an eval package, compare the report's pasted output, logs, or screenshot description with the exact problem in the issue. In live mode, compare my draft's output with the GitHub issue. The evidence should show that specific behavior. A passing test may support a cannot-reproduce report if the author actually tried the correct trigger.

## Honesty

Compare the report's conclusion with its commands and actual output. The report should distinguish what was expected from what happened. An evidenced cannot-reproduce result can pass; an unrelated error cannot prove the reported bug.

## Comms

In an eval package, read the claim and repro comments against the issue thread and repo-facts policy. In live mode, check the GitHub issue, contribution guide, issue template, and any stated AI-use rule. The claim should name this issue and promise an investigation and report, without pretending the test has already been done. Follow an explicit AI-disclosure requirement if one exists. Another student's claim or repro does not block my own work on Path Review.
