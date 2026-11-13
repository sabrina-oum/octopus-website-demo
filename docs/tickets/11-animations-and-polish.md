# 11: Animations and polish

**What to build:** while scrolling the pages, a visitor sees content appear as the Figma Motion Documentation describes, with consistent hover states. Visitors who reduce motion only get a fade, and the content stays visible without JavaScript.

**Blocked by:** 04 (Homepage hero and SEO), 05 (Best sellers carousel), 06 (Category sections), 07 (Explore all categories and Find us at), 08 (Product page hero and SEO), 09 (Gallery and feature cards), 10 (Specifications accordion)

**Status:** done — 2 open points

- [x] A home-made `Reveal` component animates the elements, with no animation library
- [x] The animation triggers once, on entering the screen, with no exit
- [x] The effect is a fade with a 60 px rise, or 30 px for text only
- [x] The transition is `ease-out`, over 1.2 s with a 0.1 s delay
- [x] Elements in the same section appear together
- [ ] The animated elements follow the Figma « Applies to » blocks, excluding pages that aren't built — `Reveal` wraps the hero, the category sections, « Explore all categories », the product hero, the gallery, the feature cards and the specifications, but not the Best sellers carousel, which the Figma lists (« H03 Best sellers carousel »), nor the « Find us at » banner. To check in the Motion Documentation.
- [x] With `prefers-reduced-motion`, only the opacity changes
- [x] Content stays visible if JavaScript does not load — nothing is hidden when scripts are disabled, and the content shows after 3 s if the script does not load
- [x] Hover states and image transitions follow the design
- [ ] The Homepage's mobile Lighthouse score is measured after the change, and any drop below 90 is reported to Sabrina with a proposal for the hero — no Lighthouse report in the repository

## Update of 12 November

- The `Reveal` Playwright test was removed (commit `73655bf`): the animation is no longer covered by an automated test.
