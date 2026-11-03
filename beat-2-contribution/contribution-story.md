# Contribution: [Feature] tiptap editor: Add keyboard shortcut for inserting a hyperlink

Path: `beat-2-contribution/contribution-story.md`

This file is Assignment 5, and it is graded at the path above; a copy kept anywhere else in
the repository is not read. **Keep every section header below under its exact name** — the
format criteria grade exactly that. Your course repo link is the whole submission: no tool
files and no evidence uploads are part of Assignment 5.

**Contribution Number:** [1]
**Student:** BingYing Li
**GitHub Username:** bing-ying-li
**Issue:** https://github.com/Ocelot-Social-Community/Ocelot-Social/issues/4666
**Pull Request:** [GitHub PR link, once opened]

One repository, built across units 5 to 8, telling the whole story of your real
contribution. Fill it as you work, not at the end — the sections below ask for evidence that
is far easier to write down as it happens than to reconstruct in the last weekend.

Contribution Number stays `[1]` unless you make more than one contribution this term; it
just numbers them.

---

## Toolkit

Every story section below, from Why I Chose This Issue through Pull
Request, ends with a Toolkit block: which tool did that phase's work
and how you used it, what it produced, what difficulties or
shortcomings it presented, and what you changed or would change
because of them. Together the blocks are the thread the rubric's
Toolkit points read, and they are the raw material for your unit-9
portfolio, so keep them current as you work rather than
reconstructing them later.

A Toolkit block looks like this (copy it into each story section and
fill it there):

```text
**Toolkit**

- Tool: [which tool did this phase's work, and how you used it]
- What it produced: [described in a sentence or a short excerpt]
- Difficulties: [what fought you or fell short, or "none met"]
- What changed: [the patch, revision, or workaround, what you would
  update, or "nothing"]
```

This section also keeps one short dated entry per week of tool work,
starting below: what you built or changed that week, what broke, and
what you changed because of it. The blocks tell the story where it
happened; these entries are the toolkit's own timeline.

All four entries are graded. Keep every heading below, and fill each
one in the week it belongs to.

**Unit 5: Built and refined my issue scout — 2026-10-18**

I upgraded issue-select to issue-scout and wrote a Python search strategy that removes assigned issues and ranks candidates by fewest comments, then most recent update. My first scan accepted four of five candidates, but the rubric lacked a specific check for problems already fixed or work only a maintainer could complete, so I added that check while keeping failed reproduction alone from causing rejection. I then graded three issues from the course selection site: the scout accepted Blueprints #229 and rejected Red-DiscordBot #6794 because existing pull requests already covered it. It also rejected CTSM #1621 as already fixed despite incomplete evidence, so I recorded that verdict as needing verification and partial fixes as a remaining rubric gap.

**Unit 6: Installed the voice guard and wrote my first repo-memory file — 2026-11-02**

I installed the voice guard so my voice guide lives in one canonical file and a hook checks every `gh issue comment` before it goes out; the wiring test was stopped as expected. On Windows, `ln -sf` failed with "Operation not permitted" for all three skills, so I used the INSTALL.md fallback and made each skill's `voice-guide.md` a one-line pointer to the canonical guide. The guard passed my Ocelot-Social #4666 claim twice, once with the manual `--draft` check and once in the hook when I posted it. I then cloned Ocelot-Social, kept a `CLAUDE.local.md` out of git with `.git/info/exclude`, and filled it with the repo's contribution rules, the editor files my issue touches, and the test commands I verified by running them: the existing Editor tests passed as a baseline (8 suites, 107 tests), and my reproduction test passed 5 of 5 checks, showing that Ctrl+K and Cmd+K don't open the link input, though only in jsdom, not a real browser.

**Unit 7: [one line on the tool work]**

[2-4 sentences: the ship-gate and your gate manifest. What it produced
on your real branch, what fought you, what changed because of it.]

**Unit 8: [one line on the tool work]**

[2-4 sentences: the PR-monitor and your playbook. What it read, what it
drafted, what you did with the draft.]

---

## Why I Chose This Issue

I found this issue on the course Issue Selection website. I gave my issue-scout the site's URLs in three rounds on 2026-10-25 (3, then 6, then 18 issues) and had it check availability before grading anything. Most of them were stale: 22 of the 27 were already claimed, closed, fixed on the default branch, blocked, or had a fix in progress. devtrack #164 was still listed even though its fix had been merged months earlier, and WebDevTools #402 had a competing PR (#627) that never linked the issue, so it only showed up when I searched the repo's open PRs. That taught me to read every comment, search open PRs by keyword, and check the current code before trusting an issue that looks open. From the third round the scout accepted three issues, and Ocelot-Social #4666 was one of them: verdict **accept**, all required checks passing, difficulty **moderate** because I have to find where the shortcut goes and it touches more than one file (the editor and the toolbar legend). The scout ranked it second for my Full Stack target, behind devtrack #215. devtrack #215 was my first choice, but another student had already claimed it on the course Issue Selection website, so I chose Ocelot-Social #4666 instead: it was available, moderately scoped, and relevant to my Full Stack goals.

Ocelot-Social is the most full-stack repo of my candidates (GraphQL, Node.js, and a Vue/Nuxt webapp), though this issue itself is frontend only: an accessibility feature (Ctrl+K / Cmd+K opens the link input) that needs a Jest test, and the core team merges work almost daily. From this issue I want to understand how a keyboard shortcut interacts with the editor's existing link UI, reuse the behaviour that is already there instead of building something new, and write component tests for that interaction. On the tool: the rubric I patched for Unit 6 held up here. Its old "Newcomer-sized scope" check failed any issue with an open design question, so I replaced it with **scope-feasible**, which only fails issues that aren't one piece of work and records open edges as a difficulty note (straightforward / moderate / ambitious) that never changes the verdict. That is why #4666 could pass as a moderate issue instead of being rejected for leaving the exact approach open. Where the scout fell short was availability: it trusted linked PRs and the course site's listing, so I rechecked #4666's thread, assignees, and open PRs again on 2026-11-02 right before I posted my claim: https://github.com/Ocelot-Social-Community/Ocelot-Social/issues/4666#issuecomment-6597683611

**Toolkit**

- Tool: issue-scout in direct mode. I gave it 27 course-site issue URLs in three rounds; it checked each thread, assignees, PRs, and the current code first, then graded the available ones against my rubric.
- What it produced: an **accept** verdict for #4666 with all seven checks passing and difficulty "moderate", ranked second of three accepted issues for Full Stack fit (recorded in `scan-output.md`, "round 3", 2026-10-25, plus an availability recheck on 2026-11-02).
- Difficulties: course-site issues went stale fast (22 of 27 excluded); an unlinked competing PR (WebDevTools #402) was invisible from the issue page; a listed issue (devtrack #164) was already fixed on `main`; and the 18-URL round was cut off by a connection loss and had to be resumed from a saved checkpoint.
- What changed: I replaced "Newcomer-sized scope" with the scope-feasible check and its difficulty note (2026-10-25). I now search open PRs by keyword, check the default branch's code, and recheck availability right before claiming. The keyword PR search is logged as friction in `scan-output.md` but is not patched into the rubric yet.

---

## Understanding the Issue

**Problem Description**

[In your own words, what is broken or missing?]

**Expected Behavior**

[What should happen?]

**Current Behavior**

[What actually happens?]

**Affected Components**

[Which parts of the codebase are involved?]

**Toolkit**

- Tool:
- What it produced:
- Difficulties:
- What changed:

---

## Reproduction Process

**Environment Setup**

I tested upstream `master` at commit `d5629679f7ff001e65f521747a78ea0dae8578d4` (2026-11-02), the project's own commit, on Windows 11 Home in Git Bash. The repo pins Node v26.8.1 in `.nvmrc` and `webapp/.nvmrc`. It uses npm (`package-lock.json`, lockfile version 3, no `engines` or `packageManager` field), and `webapp/.npmrc` sets `install-links=true`. My machine had Node 24.13.0, so for this work only I used the official portable Node v26.8.1 zip (npm 11.19.0, SHA-256 checked) instead of switching my global Node. I set it up in the same order CI and the webapp Dockerfile use, because the webapp depends on the two local packages being built first:

```
cd packages/ui && npm ci && npm run build
cd ../branding && npm ci && npm run build
cd ../../webapp && npm ci
```

Challenges:
- **Node version:** `.nvmrc` says 26.8.1, but the webapp Dockerfile uses `node:26.12.1-alpine`. I followed `.nvmrc`, which is what CI's lint job reads.
- **No Docker:** CI runs the webapp unit tests inside Docker. Docker is installed on my machine, but its daemon wasn't running, so I ran Jest locally, which is the README's local path.
- **Install scripts:** npm warned that some install scripts aren't covered by `allowScripts`. `webapp/.npmrc` says vue-demi's postinstall must run, so I checked that `node_modules/vue-demi/lib/index.cjs` has `isVue2 = true`.
- **Running a subset:** `npm test` adds `--coverage` with a 95% global threshold, which a partial run can't meet, so I called jest directly. My first baseline run passed its own `--testPathIgnorePatterns`, which replaced the config's list. That picked up two Playwright `*.visual.spec.js` suites that fail under Jest, so I reran with the config's patterns added back.

**Steps to Reproduce**

1. Check out commit `d5629679f7ff001e65f521747a78ea0dae8578d4` and run the setup above.
2. Baseline, from `webapp/`: `npx cross-env NODE_ENV=test jest components/Editor --testPathIgnorePatterns '/node_modules/' '\.visual\.spec\.js$' 'repro-4666'`. Result: 8 of 8 suites and 107 of 107 tests passed.
3. Save the test in the collapsed block below as `webapp/components/Editor/repro-4666.local.spec.js`. It mounts `Editor.vue` the same way `Editor.spec.js` does, with the content `<p>Example text</p>`. It selects all of the text and sends `keydown` events to the editor's ProseMirror element (`editor.view.dom`).
4. From `webapp/`, run `npx cross-env NODE_ENV=test jest components/Editor/repro-4666.local.spec.js`.
5. Observed: all 5 checks pass, which confirms the current behaviour.
   - Ctrl+B is handled and makes the text bold.
   - Clicking the toolbar link button shows the link input and opens its context menu.
   - Ctrl+K and Cmd+K are not handled: the event isn't prevented, the link input stays hidden, and the text is unchanged.

Output of step 4 (stack-trace lines removed):

```text
  console.log
    Ctrl+B defaultPrevented: true html: <p><strong>Example text</strong></p>
  console.log
    after toolbar click: isLinkInputActive=true linkInputShown=true contextMenuOpen=true
  console.log
    Ctrl+K: defaultPrevented=false isLinkInputActive=false linkInputShown=false html=<p>Example text</p>
  console.log
    Cmd+K: defaultPrevented=false isLinkInputActive=false linkInputShown=false html=<p>Example text</p>
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.592 s, estimated 2 s
Ran all test suites matching components/Editor/repro-4666.local.spec.js.
```

<details>
<summary>The reproduction test: <code>repro-4666.local.spec.js</code> (local only, never committed upstream)</summary>

```js
// Reproduction for #4666 only (local, never committed): observes current behaviour, fixes nothing.
import { mount } from '@vue/test-utils'
import { TextSelection } from 'prosemirror-state'
import Editor from './Editor'

import MutationObserver from 'mutation-observer'
import Vue from 'vue'

global.MutationObserver = MutationObserver

const localVue = global.localVue
const stubs = { transition: false, UserAvatar: true }

describe('#4666 reproduction: keyboard shortcut for a link', () => {
  let wrapper

  const selectAllText = () => {
    const { state, dispatch } = wrapper.vm.editor.view
    dispatch(state.tr.setSelection(TextSelection.create(state.doc, 1, state.doc.content.size - 1)))
  }

  const pressKey = (key, modifiers) => {
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...modifiers })
    wrapper.vm.editor.view.dom.dispatchEvent(event)
    return event
  }

  const linkInputShown = () => wrapper.vm.$refs.linkInput.style.display !== 'none'

  beforeEach(async () => {
    wrapper = mount(Editor, {
      mocks: { $t: (key) => key },
      propsData: { value: '<p>Example text</p>' },
      localVue,
      sync: false,
      stubs,
    })
    await Vue.nextTick()
    selectAllText()
    await Vue.nextTick()
  })

  afterEach(() => wrapper.destroy())

  it('setup: the selection covers the text', () => {
    const { from, to } = wrapper.vm.editor.state.selection
    expect(wrapper.vm.editor.state.doc.textBetween(from, to)).toBe('Example text')
    expect(linkInputShown()).toBe(false)
  })

  it('control: Ctrl+B reaches the editor keymap and makes the selection bold', async () => {
    const event = pressKey('b', { ctrlKey: true })
    await Vue.nextTick()
    console.log('Ctrl+B defaultPrevented:', event.defaultPrevented, 'html:', wrapper.vm.editor.getHTML())
    expect(event.defaultPrevented).toBe(true)
    expect(wrapper.vm.editor.getHTML()).toContain('<strong>')
  })

  it('control: clicking the toolbar link button opens the link input', async () => {
    const button = wrapper.find('button[aria-label="editor.legend.link"]')
    expect(button.exists()).toBe(true)
    await button.trigger('click')
    await Vue.nextTick()
    await Vue.nextTick()
    console.log(
      'after toolbar click:',
      `isLinkInputActive=${wrapper.vm.isLinkInputActive}`,
      `linkInputShown=${linkInputShown()}`,
      `contextMenuOpen=${!!wrapper.vm.$refs.contextMenu.menu}`,
    )
    expect(wrapper.vm.isLinkInputActive).toBe(true)
    expect(linkInputShown()).toBe(true)
    expect(wrapper.vm.$refs.contextMenu.menu).toBeTruthy()
  })

  it.each([
    ['Ctrl+K', { ctrlKey: true }],
    ['Cmd+K', { metaKey: true }],
  ])('observed: %s does not open the link input', async (name, modifiers) => {
    const event = pressKey('k', modifiers)
    await Vue.nextTick()
    await Vue.nextTick()
    console.log(
      `${name}: defaultPrevented=${event.defaultPrevented}`,
      `isLinkInputActive=${wrapper.vm.isLinkInputActive}`,
      `linkInputShown=${linkInputShown()}`,
      `html=${wrapper.vm.editor.getHTML()}`,
    )
    expect(event.defaultPrevented).toBe(false)
    expect(wrapper.vm.isLinkInputActive).toBe(false)
    expect(linkInputShown()).toBe(false)
  })
})
```

</details>

**Reproduction Evidence**

- **Commit showing reproduction:** none. I made no reproduction commit in an Ocelot-Social fork or branch; the test ran only in my local clone. `d5629679f7ff001e65f521747a78ea0dae8578d4` is the upstream `master` commit I tested, not my work. Any later course-repo commit that adds this story and its evidence copies is coursework, not a reproduction commit.
- **Screenshots/logs:** the commands, the full test, and its output are in this story, under Steps to Reproduce (last run 2026-11-03).
- **My findings:**
  - **Expected (from the issue):** with text selected, Ctrl+K (Cmd+K on Mac) opens the same link popup as the toolbar button.
  - **Actual:** `Ctrl+K: defaultPrevented=false isLinkInputActive=false linkInputShown=false html=<p>Example text</p>`. Cmd+K gives the same result.
  - **Controls:** `Ctrl+B defaultPrevented: true html: <p><strong>Example text</strong></p>` shows that key events sent this way reach the editor's keymap. `after toolbar click: isLinkInputActive=true linkInputShown=true contextMenuOpen=true` shows the link input works in this setup. So in this test setup I reproduced the missing shortcut.
  - **From reading the code (not tested on its own):**
    - There is no key binding for links in `webapp/components/Editor/`.
    - The toolbar calls `toggleLinkInput(getMarkAttrs('link'), event.target.closest('button'))`, and `toggleLinkInput` only opens the popup when it gets both the link attributes and an element to anchor the menu to.
    - The legend's link entry has `shortcut: ''` (`MenuLegend.vue:64`).
  - **Limits:**
    - This is a jsdom unit test, not a real browser, so I didn't check what a browser does with an unhandled Ctrl+K.
    - I didn't test on a Mac. Cmd+K was only simulated with `metaKey`.
    - I didn't run the full app (it needs Docker), the full `npm test` with coverage, or lint.
  - **Not posted:** this report stays in my story, because the assignment says not to post the reproduction on the issue.

**Toolkit**

- Tool: repro-check in live mode on the full package: my posted claim plus `repro-draft.md`, graded against the live issue thread. I also ran my voice guard's manual `--draft` check on the report.
- What it produced: **accept**, with all six required checks and the preferred check passing. It checked:
  - that the posted claim matches my draft;
  - that the environment names the commit, OS, Node and npm versions, setup order, and the difference from the Docker image's Node;
  - that the test in the report is byte-identical to the one that ran, with the exact commands;
  - that the Ctrl+K and Cmd+K output matches the issue's click-only behaviour, next to working Ctrl+B and toolbar controls;
  - that the conclusion keeps code reading separate from tested behaviour and lists the jsdom limits;
  - that the AI disclosure is there even though the repo states no policy.

  The voice guard also passed.
- Difficulties:
  - A test that only shows Ctrl+K "does nothing" proves nothing alone, so the report needed controls that show the setup can work.
  - My first toolbar control only checked the `isLinkInputActive` flag, not whether the input was actually visible.
  - The commands ran in my Claude Code session. My voice guide says never to claim I ran a command I didn't, so the disclosure wording had to be exact.
  - jsdom can't show what a real browser does with Ctrl+K.
- What changed:
  - I strengthened the toolbar control to also check that the link input is visible and the context menu is open, then reran it.
  - I worded the disclosure as "The commands ran on my machine, and the output above is copied from that run" instead of "I ran the commands myself".
  - repro-check pointed out that same rule, so I'll rerun the two jest commands myself or keep that wording.
  - On 2026-11-03 I reran the baseline and the reproduction on the same commit for the saved output.

---

## Solution Approach

**Analysis**

[Your analysis of the root cause: what is causing the issue, traced
to the files and functions involved.]

**Proposed Solution**

[High-level description of your fix approach, and what you are
deliberately NOT changing.]

**Implementation Plan**

1. [Modify file X to do Y]
2. [Add or change Z]
3. [Update tests]

[Record deviations here as they happen: what changed mid-build and
why. A recorded deviation is honest work; silent drift is not.]

**Toolkit**

- Tool:
- What it produced:
- Difficulties:
- What changed:

---

## Testing Strategy

[What observable checks prove the fix: your reproduction steps re-run
against the built change (before and after), and the repo's own test
suite or checks with the outcome shown. "Tests pass" with nothing
observable named is not a strategy.]

**Toolkit**

- Tool:
- What it produced:
- Difficulties:
- What changed:

---

## Implementation Notes

[A running log, added to as you work. Date each entry. What you
built, decisions you made when you made them, wrong turns included.]

**[Date]**

[Entry]

**[Date]**

[Entry]

**Toolkit**

- Tool:
- What it produced:
- Difficulties:
- What changed:

---

## Pull Request

**PR Link:** [GitHub PR URL when opened]

**PR Description:** [what the PR says; much of the content above
adapts into it]

**Maintainer Feedback:**

- [Date]: [feedback received, or "none yet"; silence is a normal
  state and costs you nothing]
- [Date]: [how you addressed it]

**Status:** [Awaiting review / Iterating / Merged / Closed. The
status is a fact you record, never a grade: the PR is graded as
opened.]

**Toolkit**

- Tool:
- What it produced:
- Difficulties:
- What changed:

---

## Learnings and Reflections

**Technical Skills Gained**

[What you learned technically, named concretely.]

**Challenges Overcome**

[What was hard and how you solved it; point at the real events, the
Toolkit blocks above are full of them.]

**What I'd Do Differently Next Time**

[Reflection on your process.]

---

## Resources Used

[What actually helped, not a reading list. List things this story
already shows you using: the doc you followed to set the environment
up, the thread that explained the bug, the person who answered you.
One real entry beats ten plausible ones.]

- [Link to documentation that helped]
- [Discussion, issue, or post that helped]
