# 03: Header, footer and « Coming soon »

**What to build:** on both pages, a visitor navigates with a header and a footer that match the Figma. Below 1200 px, the menu opens and closes with a mouse, touch and the keyboard. Every out-of-scope link leads to a « Coming soon » page.

**Blocked by:** 02 (Design tokens and matching card)

**Status:** done

- [x] On desktop, the header (`Header` component) shows the full navigation and the « Where to buy » button
- [x] Below 1200 px, the navigation folds into a menu built on Radix, behind a project-specific component
- [x] The menu opens and closes, works with the keyboard and closes on Escape
- [x] Focus returns to the open button when the menu closes
- [x] The menu's state is announced to screen readers
- [ ] The footer (`Footer` component) and its links follow the Figma at each breakpoint — visual fidelity still to confirm (ticket 12)
- [x] The « Coming soon » page exists, and no link is broken — a Playwright test checks every link on the built pages
- [x] Component tests cover opening, closing, Escape and the keyboard
- [x] A Playwright test covers the mobile menu

## Update of 12 November

- The Figma tablet frames show the full navigation, but the brief asks for a menu below 1200 px: tablet therefore uses the menu (assumption noted in the README).
- The footer component test was removed (commit `73655bf`): the ticket did not require it.
