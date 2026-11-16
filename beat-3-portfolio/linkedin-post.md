I contributed two improvements to the open-source Ocelot-Social editor, starting with a keyboard shortcut for inserting links. I then followed up on maintainer feedback to make the editor's shortcut instructions accurate for both Mac and Windows users.

The first change lets people open the existing link input with Ctrl+K on Windows or Cmd+K on Mac, instead of reaching for the toolbar. While developing it, I added tests and revised the behavior after code review highlighted interactions with the editor's mention suggestions.

After that contribution was merged, a maintainer pointed out that other shortcuts in the help legend still showed Ctrl on Macs. I updated the legend to display the correct key for each platform and added tests covering both systems.

Both pull requests were merged in November 2026. The experience reinforced the value of testing, listening to feedback, and improving small usability details until they work consistently for different users.

https://github.com/Ocelot-Social-Community/Ocelot-Social/pull/10853
