# 05: Best sellers carousel

**What to build:** on the Homepage and the product page, a visitor browses the best sellers with arrows and dots on desktop, and by swiping on a touch screen. Products appear according to their best seller flag in the data.

**Blocked by:** 02 (Design tokens and matching card)

**Status:** done

- [x] The carousel uses Embla behind a project-specific component, with no Embla import anywhere else
- [x] Cards stay rendered on the server and are passed as children
- [x] The arrows and dots work on desktop
- [x] The arrows are disabled at the start and end
- [x] Swiping works on a touch screen
- [x] The controls are keyboard-accessible and have accessible names
- [ ] The carousel and its section match the Figma at each breakpoint — still to confirm visually (ticket 12)
- [x] The same component is reused on both pages
- [x] Component tests cover the arrows, the dots and the disabled states, with a fake Embla
- [x] ~~A Playwright test covers real scrolling, including the start and end~~ → **changed:** Playwright covers swiping and the last card aligning with the page margin. The arrows and the start and end states are only covered by component tests, since tests judged unnecessary were removed (commit `73655bf`).

## Update of 12 November

- The Figma shows arrows only: the dots the brief asks for sit to the left of the arrows (assumption noted in the README).
- No animation when the visitor prefers reduced motion, and no controls when every card fits on screen.
