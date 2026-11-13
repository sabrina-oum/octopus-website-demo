# 09: Gallery and feature cards

**What to build:** on the product page, a visitor browses the image gallery and the feature cards, matching the Figma at all three breakpoints.

**Blocked by:** 02 (Design tokens and matching card)

**Status:** done

- [x] The gallery and the feature cards are generated from the data
- [ ] The layout follows the Figma at each breakpoint and stays fluid between them — still to confirm visually (ticket 12)
- [x] Images have the right ratios and cause no layout shift — Figma width and height, fixed after a gap was spotted at 746 px
- [x] Images below the fold load lazily
- [x] Images have relevant alt text — the feature card images have an empty alt, as their title already says what they show
- [x] There is no horizontal scrolling — Playwright test at several widths

## Update of 12 November

- The gallery photos were not provided: the product cutout stands in for all six, at the Figma sizes. Each feature card therefore places its text above the image (assumption noted in the README).
- Since then, `placeholder.png` replaced the cutout, so each feature card follows the Figma again: the photo fills the card and the text sits on top of it.
