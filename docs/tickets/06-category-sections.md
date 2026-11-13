# 06: Category sections

**What to build:** a visitor explores the Homepage's Kitchen, Hair Care, Home Security and Accessories sections. Each follows the Figma layout, and adding a product to the data is enough to show it in the right section.

**Blocked by:** 02 (Design tokens and matching card)

**Status:** done

- [x] The four sections are generated from the data
- [x] The section header is a reusable component, `SectionHeader`, separate from the site's `Header`
- [ ] The large featured card and the smaller cards follow the Figma at each breakpoint — still to confirm visually (ticket 12)
- [x] Rows become stacked columns on mobile — Playwright test
- [x] Category banners use the image intended for each breakpoint — Playwright test
- [x] Images below the fold load lazily, without layout shift
- [x] ~~Adding a product to the JSON shows it in the right section, without changing the markup~~ → **changed:** sections are curated by hand. A product added to the JSON appears once its id is added to a section of the Homepage data, without changing the markup.
- [x] ~~Every « Learn more » leads to the Countertop Blender's page~~ → **changed:** each « Learn more » leads to its own product's page

## Update of 12 November

- Categories now come from their own JSON file instead of the code (commit `3706598`).
- **In progress, not committed:** a `cardText` field lets a section give its cards a different name or description from the product's, as the Figma does. A `cardText` entry for a product the section does not show fails the build. The changes touch the Homepage data and schema, the data layer, the tests and the README.
- The Figma lifestyle photos were not provided: the « Category » photos replace them, and text over these photos sits on a band in the photo's colour (assumptions noted in the README).
