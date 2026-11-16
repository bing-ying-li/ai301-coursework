# Improving Editor Keyboard Shortcuts in Ocelot-Social: From a Link Shortcut to a Cross-Platform Fix

## Overview

I contributed to Ocelot-Social, an open-source social-networking project, by improving keyboard shortcuts in its post and comment editor. The original request, [Issue #4666](https://github.com/Ocelot-Social-Community/Ocelot-Social/issues/4666), was to let users open the hyperlink input without having to click the toolbar. In [PR #10853](https://github.com/Ocelot-Social-Community/Ocelot-Social/pull/10853), I added Ctrl+K on Windows and Cmd+K on Mac, integrated the shortcut with the existing link popup, and added regression tests. After review, a maintainer identified an inconsistency in the editor's shortcut legend on macOS. I addressed that follow-up through [Issue #10916](https://github.com/Ocelot-Social-Community/Ocelot-Social/issues/10916) and [PR #10918](https://github.com/Ocelot-Social-Community/Ocelot-Social/pull/10918). The first PR was merged on November 11, 2026, and the follow-up was merged on November 12.

## What happened

### 1. Implementing a shortcut within the existing editor

The starting point was a specific usability problem: creating a hyperlink required using the editor toolbar. A keyboard shortcut would make the same action faster, but simply capturing a key combination would not be enough. It needed to use the existing link input rather than create a second UI, behave correctly with selected text, and avoid changing the read-only content viewer.

The merged implementation added a Tiptap keyboard-shortcut extension in `webapp/components/Editor/plugins/linkShortcut.js` and registered it in `Editor.vue`. The shortcut opened the existing link popup, positioned at the toolbar's link button. Pressing the shortcut again or Escape closed it. It also updated the editor legend to show the link shortcut. The PR description confirms that the extension was registered only in the editable editor, not in `ContentViewer`.

One piece of evidence is the Mac-specific regression test added in `Editor.mac.spec.js`:

```javascript
it('opens the link input with Cmd+K', async () => {
  const event = pressKey('k', { metaKey: true })
  await Vue.nextTick()
  await Vue.nextTick()
  expect(event.defaultPrevented).toBe(true)
  expect(wrapper.vm.isLinkInputActive).toBe(true)
  expect(wrapper.vm.$refs.contextMenu.menu).toBeTruthy()
})
```

This test does more than check that a key event fires. It checks that the browser's default action is prevented, that the editor's link-input state becomes active, and that the popup exists. A separate Mac test confirms that Ctrl+K is left alone on that platform. The PR also included editor tests for other platforms and link-related behavior. This evidence comes from the actual files in the merged PR, not a made-up example.

### 2. Responding to review feedback

The initial solution needed revisions. CodeRabbit's review pointed out that opening the link popup while a mention or hashtag suggestion list was active could leave inconsistent suggestion state. It also asked for the legend to display Cmd+K on Mac rather than a fixed Ctrl+K. These were integration issues: a shortcut that worked in isolation could still interfere with another editor feature.

The commit history shows that I followed up with revisions, including `e62088b` (address link shortcut review feedback), `ff414b3` (fix shortcut legend formatting), and `c9c8546` (restore mention suggestions after the link shortcut). Those commits are concrete evidence of changes after the first implementation, rather than just a first draft submitted once.

A second piece of evidence is the actual sequence of revision commits recorded in the pull request:

```text
e62088b  fix(webapp): address link shortcut review feedback
ff414b3  style(webapp): fix link shortcut legend formatting
c9c8546  fix(webapp): restore mention suggestions after link shortcut
```

The relevant point is the reason for the change. Handling `Mod-K` correctly required coordinating the link popup and suggestion state, then testing that suggestions could recover after the popup closed. That broadened the work from a single shortcut into reliable interaction with existing editor behavior.

On November 9, I told the maintainer that the previous feedback had been addressed and CI checks were passing, while real-Mac testing was still outstanding. Tirokk approved the PR on November 10. On November 11, [PR #10853](https://github.com/Ocelot-Social-Community/Ocelot-Social/pull/10853) was merged into `master` as commit `a98d14b`.

### 3. Turning a maintainer's follow-up into a second merged change

The initial PR improved the *link* entry in the shortcut legend, but the bold, italic, and underline entries still displayed `ctrl` on Macs. The maintainer mentioned this inconsistency during approval, then opened [Issue #10916](https://github.com/Ocelot-Social-Community/Ocelot-Social/issues/10916) on November 12. The issue asked for one shared platform check and tests for both platforms.

I made that follow-up in `MenuLegend.vue`. Previously, the platform check applied only to the link entry. The new approach reused one modifier for all four shortcuts:

```javascript
const modifier =
  typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform) ? 'cmd' : 'ctrl'
```

The corresponding code uses this value to display `${modifier} + b`, `${modifier} + i`, `${modifier} + u`, and `${modifier} + k`. This makes the legend internally consistent: Mac users see Cmd and other users see Ctrl.

A third piece of evidence is the parameterized regression test from `MenuLegend.spec.js`:

```javascript
it.each([
  ['Win32', 'ctrl'],
  ['MacIntel', 'cmd'],
])('shows correct shortcuts on %s', (platform, modifier) => {
```

The test simulates each platform and checks the four labels for bold, italic, underline, and link. This is a focused test of display behavior, not a claim that the code was manually tested on every browser or Mac device.

The second result also landed: Tirokk approved [PR #10918](https://github.com/Ocelot-Social-Community/Ocelot-Social/pull/10918), it was merged on November 12, and the maintainer closed Issue #10916 as completed. Together, the two merged PRs show a full cycle: implementing a requested feature, responding to review, and returning to correct a related usability detail.

## Limitations and what's next

There are still limits to what this work establishes. The initial PR left macOS manual verification unchecked; automated tests simulating `MacIntel` are not the same as manually checking macOS browsers. The legend tests cover two platform identifiers, but they do not demonstrate behavior in every browser environment. Also, the original PR's maintainer noted another possible improvement: in a long editor, the toolbar and link popup could be outside the visible area when the shortcut is pressed. That scrolling concern was separate from my follow-up legend fix.

If continuing this work, I would manually verify the full shortcut flow on macOS and Windows, test how the link popup behaves with long documents and scrolling, and add focused regression tests for those cases. The main lesson from these contributions is that an apparently small editor shortcut can affect several existing UI states. The strongest solution was not just to make the key combination work, but to respond to feedback and make its behavior and documentation consistent across platforms.
