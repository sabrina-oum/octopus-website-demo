# 08: Product page hero and SEO

**What to build:** on the Countertop Blender's page, a visitor sees the title, the description, the colour selector and « Where to buy ». Choosing a colour updates the selected state, and the page exposes its metadata.

**Blocked by:** 02 (Design tokens and matching card)

**Status:** done

- [ ] The hero follows the Figma at each breakpoint — still to confirm visually (ticket 12)
- [x] The title, description and colours come from the data
- [x] Selecting a colour updates the selected state
- [x] The selector works with the keyboard — arrow keys, like a radio group
- [x] The chosen colour is announced to screen readers and does not depend on colour perception alone — its name is written as text
- [x] « Where to buy » follows the design system states
- [x] The page has a title, a description and Open Graph tags from the data — Playwright test
- [x] A component test covers updating the selected colour

## Update of 12 November

- The data lists Black and White: the Figma hides a second, white swatch. The photo stays the same, as no white photo was provided (assumption noted in the README).
- On mobile, « Where to buy » is a bar fixed at the bottom of the screen, as in the Figma. The desktop Figma overlaps the description and « Colour - Black »: the page stacks them, like the tablet frame.
- Each product page can override its SEO fields one by one. Otherwise they fall back to the product's name, its short description and the site's share image.
