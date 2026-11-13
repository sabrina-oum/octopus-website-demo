# 10: Specifications accordion

**What to build:** on the product page, a visitor expands and collapses Technical specifications, Dimensions & weight, Product information and Downloads, with a mouse, touch and the keyboard.

**Blocked by:** 02 (Design tokens and matching card)

**Status:** done

- [x] The accordion uses Radix behind a project-specific component, with no Radix import anywhere else
- [x] ~~The four sections are generated from the data~~ → **changed:** the three collapsible sections come from the data. Downloads is a separate card that does not fold, as in the Figma.
- [x] Sections open and close with a mouse, touch and the keyboard
- [x] The open or closed state is announced to screen readers
- [ ] The accordion follows the Figma at each breakpoint — still to confirm visually (ticket 12)
- [x] Component tests cover opening, closing, ARIA and the keyboard

## Update of 12 November

- Every section is open on load.
- The manual was not provided: the link opens, in a new tab, a one-page PDF made from the specifications, which says so (assumption noted in the README).
