# 02: Design tokens and matching card

**What to build:** the Figma's visual foundations are in place, and a visitor sees a product card faithful to the design at all three breakpoints. This ticket prepares the ground for every visual ticket.

**Blocked by:** 01 (Minimal deployed journey)

**Status:** done

- [x] Colours, typography and spacing are read in the Figma with a signed-in session, without working around the export restriction
- [x] These tokens are defined once in the Tailwind theme
- [x] Breakpoints are set at 810 and 1200 px
- [x] Page margins are 16, 32 and 48 px depending on the breakpoint, with a maximum width of 1344 px on desktop
- [x] The Figma font is identified and loaded, or the closest free equivalent is chosen and noted as an assumption — Satoshi, self-hosted
- [x] The button and its states (hover, focus, disabled) follow the design system
- [x] The `Icon` component wraps Lucide, at the sizes and stroke widths of the 16 and 24 px icons
- [ ] The product card is rendered from the data and matches the Figma at each breakpoint — rendering from the data is verified; visual fidelity still to confirm (ticket 12)
- [x] The image component avoids any layout shift, with the right ratios
- [x] The images used are copied into the project with readable names
- [x] A component test checks that the card renders from the data and links « Learn more »

## Update of 12 November

- The focus ring is opaque, rather than 35 % as in the Figma, to meet WCAG AA contrast (assumption noted in the README).
