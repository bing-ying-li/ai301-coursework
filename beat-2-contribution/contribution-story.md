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

Ocelot-Social's post and comment editor has no keyboard shortcut for links. Bold, italic and underline have Ctrl+B/I/U, but the only way to add a link is to select text and click the toolbar's link button. The issue says that click-only path is an accessibility gap, for example for screen-reader users. Nothing is broken; the feature was never built. The tiptap issue it links (ueberdosis/tiptap#1886) says the shortcut belongs to the app's UI, not to tiptap. The issue asks for two things: a keyboard shortcut that opens the link popup, and the toolbar legend updated to show it (#3673).

**Expected Behavior**

With text selected, Ctrl+K (Cmd+K on a Mac) opens the same URL popup the toolbar button opens, and the browser doesn't run its own Ctrl+K action. Entering a URL links the selected text. The editor's legend lists the shortcut next to the link entry, as it already does `ctrl + b` for bold.

**Current Behavior**

Ctrl+K and Cmd+K do nothing in the editor. In my reproduction on `master` at `d5629679f` (jsdom), `Ctrl+K: defaultPrevented=false isLinkInputActive=false linkInputShown=false html=<p>Example text</p>`. That means the event isn't handled, the popup stays closed, and the text is unchanged. Two controls show the setup itself works: Ctrl+B makes the text bold, and clicking the toolbar button opens the popup. The legend's link entry has an empty shortcut (`shortcut: ''`, `MenuLegend.vue:64`).

**Affected Components**

All in `webapp/components/Editor/` (tiptap ~1.32, Vue 2.7, Nuxt 2):

- `Editor.vue` builds the tiptap editor and its extension list. It owns the link popup (`isLinkInputActive`, `toggleLinkInput`, `enterLink`, `setLinkUrl`).
- `MenuBar.vue` holds the toolbar link button, the only code that opens the popup today.
- `ContextMenu.vue` positions the popup (tippy.js) next to an anchor element.
- `MenuLegend.vue` holds the shortcut legend.
- `plugins/eventHandler.js` and `nodes/Link.js` are the existing editor extensions; neither binds a key.
- Tests are in `Editor.spec.js` (Jest + @vue/test-utils).

`defaultExtensions.js` is shared with the read-only `ContentViewer.vue`, so the shortcut must not go there. The backend isn't involved.

**Toolkit**

- Tool: Claude Code reading `webapp/components/Editor/` and its dependencies at commit `d5629679f`, with my `CLAUDE.local.md` repo-memory file keeping the conventions, file map and verified commands in one place. I checked each claimed code fact against the file and line it cites.
- What it produced: the file map above and a list of confirmed code facts, with file and line references, that `plan.md` §3 reuses. One example: `toggleLinkInput` only opens the popup when it gets both link attributes and an anchor element, and only the toolbar button passes an element.
- Difficulties: jsdom's `navigator.platform` is empty, so `Mod-` means Ctrl in tests, and my "Cmd+K" result only shows a Meta key event on a non-Mac platform. The legend shows "ctrl" even on a Mac. The open tiptap-upgrade draft PR #7232 rewrites these files, so I had to check it was inactive before relying on the current code.
- What changed: I wrote the Mac limit into the reproduction and the plan instead of claiming Cmd+K was tested. I recorded the shared `defaultExtensions.js` as a reason to register the shortcut in `Editor.vue` only. I learned to trace the existing toolbar flow before choosing where to add the shortcut. I also learned that simulating a Meta key event in jsdom does not establish how the editor behaves on a real Mac.

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

My full plan is `plan.md` in my Ocelot-Social clone. It and a short plan comment (`plan-comment.md`) stay local: Unit 7 keeps the plan comment off GitHub, so maintainers will first see my approach in the PR description.

**Analysis**

Nothing is broken: the shortcut was never built. The link popup opens only through `toggleLinkInput(attrs, element)` in `Editor.vue` (lines 454-468), and it only opens when it gets both the link attributes and an element to anchor the popup to. The only caller that passes an element is the toolbar button (`MenuBar.vue:49`, `event.target.closest('button')`). No key binding for links exists anywhere in `webapp/components/Editor/`:
- tiptap-extensions' `Link` mark has no `keys()`, though `Italic` and `Underline` do.
- Ocelot's `nodes/Link.js` only changes the schema and paste rules.
- `plugins/eventHandler.js` only transforms pasted text.

So Ctrl+K falls through the editor's keymap unhandled. That matches the reproduction: `defaultPrevented=false`, and the popup stays closed, while Ctrl+B (which has a binding) is prevented and works. Underneath, prosemirror-keymap reads `Mod-k` as Cmd on a Mac and Ctrl elsewhere, and a binding that returns `true` makes ProseMirror call `preventDefault()`. The legend's empty `shortcut: ''` for links (`MenuLegend.vue:64`) is the issue's second task.

**Proposed Solution**

Reuse the existing popup instead of building a new one. A small tiptap `Extension` binds `Mod-k` (Ctrl+K, or Cmd+K on a Mac) and calls the same `toggleLinkInput` the toolbar uses, anchored to the toolbar link button. That way `enterLink` and `setLinkUrl` link the selected text unchanged, and pressing the shortcut again closes the popup. I register it only in `Editor.vue`, so the read-only `ContentViewer` doesn't get it. The legend's link entry becomes `ctrl + k`.

I'm deliberately not changing:
- the legend's "ctrl" text on a Mac;
- what happens with an empty selection (it follows the toolbar);
- anchoring at the text cursor (only if maintainers ask);
- `nodes/Link.js` or `defaultExtensions.js`;
- the inactive tiptap-upgrade draft PR #7232;
- any other shortcut.

**Implementation Plan**

1. Add `webapp/components/Editor/plugins/linkShortcut.js`, a tiptap `Extension` whose `keys()` returns `{ 'Mod-k': () => { this.options.onShortcut(); return true } }`. Register it in `Editor.vue` next to `new EventHandler()`.
2. In `Editor.vue`, add the method the extension calls: `this.toggleLinkInput(this.editor.getMarkAttrs('link'), <toolbar link button>)`. Add `ref="menuBar"` to `<menu-bar>` in `Editor.vue` and `ref="linkButton"` to the link button in `MenuBar.vue`, so the anchor is `this.$refs.menuBar.$refs.linkButton.$el`. If that ref doesn't resolve, fall back to a scoped `querySelector` and raise it in review.
3. On the URL input in `Editor.vue`, add `@keydown.native.ctrl.k.prevent` and `@keydown.native.meta.k.prevent` handlers that call `toggleLinkInput()`. The input sits outside the editor's DOM, so pressing the shortcut again there closes the popup instead of reaching the browser.
4. In `MenuLegend.vue:64`, set the link entry's shortcut to `ctrl + k`.
5. Tests, in a new `describe('link shortcut')` block in `Editor.spec.js`, starting from `<p>Example text</p>` fully selected:
   - **A:** Ctrl+K is prevented, `isLinkInputActive` is true, the input is visible, and the popup is anchored to the toolbar link button. The reproduction showed false / false / hidden.
   - **B:** entering `https://example.org` and pressing Enter links `Example text`.
   - **C:** Ctrl+K again closes the popup with no link added.
   - **D:** Ctrl+B and the toolbar button still work.
   - **E:** Cmd+K, in its own spec file with `navigator.platform` mocked as Mac before the editor loads. I'll first check the mock with Cmd+B on unchanged code.
   - **F (optional):** a `MenuLegend` check that the link row shows `ctrl + k`.
6. Run the same checks as my unchanged-upstream baseline (2026-11-02): webapp lint, design tokens, and the full webapp unit suite with its 95% coverage gate inside CI's Docker `test` image. The baseline was 0 lint errors, tokens exit 0, and 293/293 suites, 4429/4429 tests, 96.47% line coverage. My ship-gate manifest covers exactly these three. Backend and end-to-end tests have not run locally; CI will run them on the PR, and I won't describe all of the repository's checks as passing.
7. Check in real browsers (Storybook's `Editor` story): Chrome and Firefox on Windows, keyboard-only focus, and NVDA. I'll ask a reviewer to check Cmd+K on a Mac, since I don't have one.

Deviations (recorded 2026-11-03, after the build on local branch `4666-link-shortcut`):

- **Approach:** none. The four source changes match steps 1-4. The `this.$refs.menuBar.$refs.linkButton.$el` anchor resolved (test A checks it), so I didn't need the `querySelector` fallback. The new `Editor.vue` method is named `toggleLinkInputByShortcut`.
- **Tests:**
  - Optional test F became a new `MenuLegend.spec.js`, because nothing in the suite covered the legend.
  - Test C's blur check became its own test ("stays closed when the input then loses the focus").
  - Every test that needs the popup open first asserts that it's showing. Without that, the Enter test (B) passed on the original code, so it didn't tell the fix from the original.
- **Commands:** local Jest runs in step 5 use `--runInBand`. On my machine, Jest with parallel workers stalled with no output. The three step-6 checks ran unchanged.
- **Before building:** I removed my earlier idea of posting a short version of the plan on the issue. Unit 7 keeps the plan comment local, so the anchor question will go in the `[WIP]` PR description instead.

**Toolkit**

- Tool: plan-check in live mode on `plan.md` and `plan-comment.md` for #4666, graded against the live thread (no maintainer reply, no assignee, no open PR on 2026-11-02). Before that, I used my ship-gate manifest to run the project's own checks on unchanged upstream, so the plan's test commands are the ones I verified.
- What it produced: **accept** on the first run, with all seven required checks passing. It flagged two voice-guide notes on the comment: it shows the output but not the jest command, and nobody can rerun the local test without its source. It also found three procedure gaps:
  - the live mode expects a posted repro comment, and mine was deliberately not posted;
  - it expects `comment.md`;
  - it doesn't say how to grade a comment that stays local.
- Difficulties:
  - **Native Windows run of the full suite:** it failed 27 tests in 5 suites, all POSIX-path assumptions. Upstream CI was green on the same commit, so it was my platform, and I moved the full suite to CI's Docker image.
  - **Lint:** it first failed with about 146,800 CRLF errors because of Git for Windows' `core.autocrlf=true`.
  - **Missing Node:** the portable Node v26.8.1 I'd used before was gone.
  - **Grading independence:** plan-check ran in the same Claude Code session that drafted the plan, so its accept isn't an independent read.
- What changed:
  - I reinstalled Node v26.8.1 at a fixed path, set `core.autocrlf=false` for the clone only, and recorded both and the Docker command in `CLAUDE.local.md`.
  - The plan's test commands now match the baseline, and it states that backend and e2e checks haven't run.
  - I removed the "post the plan on the issue" step from the plan and from `plan-draft.md`.
  - For now, I recorded the procedure gaps without changing plan-check. I am keeping the current assessment and its limitation that it ran in the same session as the plan.

---

## Testing Strategy

Everything here ran on my local branch `4666-link-shortcut`, based on `master` `d5629679f`. The full record is in `test_evidence.md` in my local clone.

1. **The reproduction, re-run on the change.** The same local spec, with `<p>Example text</p>` selected and keys sent to the editor:
   - Before: `Ctrl+K: defaultPrevented=false isLinkInputActive=false linkInputShown=false`.
   - After: `Ctrl+K: defaultPrevented=true isLinkInputActive=true linkInputShown=true`.
   - Its Cmd+K line didn't change. That spec runs with jsdom's empty platform, where `Mod` means Ctrl.
2. **New regression tests, failing on the original code and passing with the fix.** I ran the final versions of the 14 new tests twice: with the source changes removed, then with them in place.
   - Original code: 9 failed, 5 passed. The 5 that passed are the controls: toolbar button, Ctrl+B, Cmd+B on a simulated Mac, Ctrl+K left alone on a simulated Mac, and the bold legend row.
   - With the fix: 14 of 14 passed.
   - The tests check four things: that Ctrl+K is prevented and opens the popup at the toolbar link button, that Enter links the selected text with the right `href`, that Ctrl+K or Cmd+K inside the input closes it without adding a link, and that the legend shows `ctrl + k`.
   - Tests that need the popup open first check that it's showing, so they can't pass on the original code.
3. **Existing Editor tests.** `components/Editor` went from 8 suites and 107 tests to 10 suites and 121 tests, all passing.
4. **The project's own checks, from my ship manifest, before and after:**
   - lint: 0 errors with the same 21 existing warnings both times;
   - design tokens: exit 0 both times;
   - full webapp unit suite with its 95% coverage gate, in CI's Docker `test` image: 293/293 suites, 4429 tests, 96.47% before; 295/295 suites, 4443 tests, 96.52% after.
5. **Real browsers, automated.** Playwright drove the installed Chrome 156 and Edge 156 (headless) against Storybook's `Editor` story. It observed in both:
   - Ctrl+K was prevented, the popup opened next to the link button, and focus moved into the URL input;
   - Enter produced `<a href="https://example.org" …>Example text</a>`;
   - Esc and a second Ctrl+K closed the popup and returned focus to the editor;
   - the toolbar button and Ctrl+B still worked.

   Injected key events don't reach the browser's own shortcut handling, so this run can't show what the address bar does.
6. **Real keyboard, by me.** In the same story I checked:
   - Ctrl+K opened the link popup, and typing went straight into the URL input.
   - Enter changed the selected text's colour, closed the popup, and the next key went into the editor.
   - Esc and a second Ctrl+K also closed it, with the next key going into the editor.

   An earlier, less careful report of mine, that focus stayed in the URL input, didn't happen again in this retest, so I didn't change the code because of it. The colour change alone doesn't prove the `href`; steps 2 and 5 check that.

**Not run:**
- backend and end-to-end tests, which CI will run;
- Firefox, which isn't installed;
- NVDA;
- Tab order around the popup;
- a direct look at the browser's address bar;
- a real Mac. Cmd+K is only simulated in jsdom with a Mac platform string, which is not the same as testing on macOS.

**Toolkit**

- Tool:
  - Jest, run through Claude Code with `--runInBand` locally;
  - my ship manifest's three checks, run the way the ship-gate runs them;
  - Playwright driving the installed Chrome and Edge against Storybook;
  - my own manual keyboard test.
- What it produced: the before/after table for the 14 new tests, the before/after reproduction output, the two runs of the project's checks, and the browser results above, all recorded in `test_evidence.md`.
- Difficulties:
  - Two of my tests passed on the original code at first.
  - Storybook needed the project's `fix-storybook-webpack.js` step before it would start.
  - A leftover Storybook process kept port 3002, so the story ran on 3003.
  - Injected key events can't show the browser's own Ctrl+K handling.
  - Firefox and a Mac aren't available to me.
  - My first manual report about focus was wrong.
- What changed:
  - I added "is the popup open" checks to those tests and re-ran the before/after.
  - I marked the address bar, Firefox, NVDA and real-Mac checks as not run.
  - I recorded my manual retest as my own evidence, separate from the automated runs.
  - Next time, I would test one action at a time and check where typing goes after closing the popup, instead of treating a closed popup as proof that focus returned to the editor.

---

## Implementation Notes

[A running log, added to as you work. Date each entry. What you
built, decisions you made when you made them, wrong turns included.]

**2026-11-02: baseline for the project's own checks**

I filled my ship manifest with the three webapp checks CI runs: lint, design tokens, and the full unit suite with its 95% coverage gate. Then I ran them on unchanged `master` (`d5629679f`). It took three setup fixes:
- The portable Node v26.8.1 I'd used before was gone, so I reinstalled it at a fixed path.
- Git for Windows' `core.autocrlf=true` checked files out as CRLF, which gave about 146,800 prettier errors. I set `core.autocrlf=false` for the clone only.
- The full suite failed 27 path-related tests natively on Windows, while upstream CI was green on the same commit. So I moved the suite into CI's Docker `test` image.

Baseline: lint 0 errors (21 existing warnings), tokens exit 0, and 293/293 suites, 4429/4429 tests, 96.47% line coverage. plan-check accepted `plan.md` and `plan-comment.md`, which stay local.

**2026-11-03: building the shortcut**

- I re-ran plan-check on the current `plan.md` and `plan-comment.md`: accept. The issue thread still had only my claim, with no assignee, no competing PR and no new upstream commits. I created the local branch `4666-link-shortcut` from `d5629679f`. It isn't pushed, because the fork-or-upstream-branch question is still open.
- I wrote the tests before the code.
  - **Mac platform check first (plan risk 1):** with `navigator.platform` set to `MacIntel` before the editor loads, Cmd+B made the text bold on unchanged code. So the mock works.
  - **On the original code,** the shortcut tests failed and the controls passed (toolbar button, Ctrl+B, Cmd+B, Ctrl+K left alone on a Mac).
- I implemented plan steps 1–4:
  - `plugins/linkShortcut.js` with a `Mod-k` key binding;
  - `toggleLinkInputByShortcut()` in `Editor.vue`, reusing `toggleLinkInput` and anchored to the toolbar link button through two new refs;
  - Ctrl+K / Cmd+K handlers on the URL input;
  - the legend's link entry set to `ctrl + k`.
- **Wrong turn: a test that passed on the original code.** My first "links the selected text" test passed there, because typing into the hidden input and pressing Enter runs `enterLink` anyway. I added a check that the popup is showing first, and did the same for the new blur test.
- **Wrong turn: a stalled Jest run.** Jest with parallel workers stalled with no output on my machine, so I ran Jest locally with `--runInBand`.
- **Wrong turn: lint errors.** Lint found four prettier line-length errors in my new spec code, which I formatted with prettier on the changed files only.
- **Final before/after with the final tests:** on the original source, 9 failed and 5 passed. With the fix, all 14 passed.
- **Reproduction spec:** it now records `Ctrl+K: defaultPrevented=true isLinkInputActive=true linkInputShown=true`, where it recorded false/false/false before.
- **Editor folder:** 121 tests in 10 suites pass, up from 107 tests in 8 suites.
- **The project's three checks on the change:**
  - lint: 0 errors, the same 21 warnings;
  - design tokens: exit 0;
  - Docker suite: 295/295 suites, 4443/4443 tests, 96.52% line coverage.
- **Slow Docker run:** it took 1116 s against 268 s for the baseline. Unrelated suites slowed down too (ContributionForm 57 s → 783 s), and my new tests take under 0.2 s each locally. So it looks like a stall in the Docker environment, but it's close to the ship-gate's 25-minute limit.
- **Not done yet:**
  - backend and end-to-end tests (not run);
  - real-browser checks;
  - a real Mac. Cmd+K is only simulated in jsdom with a Mac platform string.

Nothing is committed, pushed or posted. The details are in `test_evidence.md` in my local clone.

**2026-11-03: browser checks**

- **Starting Storybook:** `npm run storybook` first failed with `Cannot find module 'webpack/lib/rules/BasicEffectRulePlugin'`. The project's `fix-storybook-webpack.js` (the step `build-storybook` runs first) fixed it without any change to project code. The broken first run kept port 3002, so I stopped it, and the story ran on 3003.
- **Automated Chrome 156 and Edge 156:** Ctrl+K opened the popup next to the link button with focus in the URL input. Enter linked the text with the right `href`. Esc and a second Ctrl+K closed it with focus back in the editor. The toolbar button and Ctrl+B still worked.
- **My manual retest:** with a real keyboard I saw the same focus behaviour. An earlier report of mine that focus stayed in the URL input didn't happen again, so I left the code as it was.
- **Still not run:** Firefox, NVDA, a direct check of the address bar, and a real Mac.

**Toolkit**

- Tool: Claude Code on a local branch, working from my accepted `plan.md`. It wrote the tests before the code, ran them on the original and changed source, and logged results to `test_evidence.md`. My ship manifest's checks ran the way the ship-gate runs them.
- What it produced: four source changes and three test files, all in `webapp/components/Editor/`, with dated notes above and the deviations recorded in my Solution Approach and `plan.md`.
- Difficulties:
  - Jest with parallel workers stalled on my machine.
  - Two tests didn't tell the fix from the original code.
  - Four prettier errors in my new spec code.
  - A Docker run four times slower than the baseline, close to the gate's 25-minute limit.
  - Storybook setup problems.
- What changed:
  - I used `--runInBand` locally.
  - I added "popup is open" checks to those tests.
  - I formatted only the files I changed.
  - I recorded the slow Docker run as a risk instead of calling it a pass with no caveat.
  - I learned that passing automated tests does not replace checking the interaction myself. I would give the tool exact observations and repeat unclear steps before asking it to change the code.

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
