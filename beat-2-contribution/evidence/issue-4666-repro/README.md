# Reproduction evidence: Ocelot-Social #4666

Issue: https://github.com/Ocelot-Social-Community/Ocelot-Social/issues/4666 (Ctrl+K / Cmd+K should open the link input in the post and comment editor).

This folder holds the evidence behind the "Reproduction Process" section of `../../contribution-story.md`. It is not my contribution: there is no reproduction commit, and nothing here was pushed upstream or posted on the issue.

## What was tested

- Upstream commit: `d5629679f7ff001e65f521747a78ea0dae8578d4` (Ocelot-Social `master`, 2026-11-02). It is the project's own commit, not mine.
- Windows 11 Home, Git Bash
- Node v26.8.1 (the version in `.nvmrc` and `webapp/.nvmrc`), npm 11.19.0
- Last run: 2026-11-03

## Files

- `repro-4666.local.spec.js`: the reproduction test, exactly as it ran. It changes no source code; it only observes the current behaviour.
- `baseline-output.txt`: Jest output for the existing Editor tests, without the reproduction test.
- `repro-output.txt`: Jest output for the reproduction test.

## Repeat it

From an Ocelot-Social clone at the commit above:

```
cd packages/ui && npm ci && npm run build
cd ../branding && npm ci && npm run build
cd ../../webapp && npm ci

# baseline (from webapp/)
npx cross-env NODE_ENV=test jest components/Editor --testPathIgnorePatterns '/node_modules/' '\.visual\.spec\.js$' 'repro-4666'

# reproduction: copy repro-4666.local.spec.js into webapp/components/Editor/, then
npx cross-env NODE_ENV=test jest components/Editor/repro-4666.local.spec.js
```

Results from my run:

- Baseline: 8 of 8 suites and 107 of 107 tests passed.
- Reproduction: all 5 checks passed. Passing here confirms the missing shortcut, not a fix:
  - setup: the selection covers the text
  - control: Ctrl+B reaches the editor keymap and makes the selection bold
  - control: clicking the toolbar link button opens the link input (the input is visible and the context menu is open)
  - observed: Ctrl+K does not open the link input
  - observed: Cmd+K does not open the link input

## Limits

- It's a jsdom unit test, not a real browser. I didn't check what a browser does with an unhandled Ctrl+K.
- Not tested on a Mac. Cmd+K was only simulated with `metaKey`.
- I didn't run the full app (it needs Docker, and the daemon wasn't running), the full `npm test` with coverage, or lint.
