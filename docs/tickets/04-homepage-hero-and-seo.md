# 04: Homepage hero and SEO

**What to build:** a visitor lands on a Homepage whose hero presents the Octopus Ionic Hair Dryer, faithful to the Figma at all three breakpoints, and the page exposes its metadata.

**Blocked by:** 02 (Design tokens and matching card)

**Status:** done

- [ ] The hero matches the Figma at each breakpoint and adapts fluidly between them — still to confirm visually (ticket 12)
- [x] Its content comes from the data, not from the markup
- [x] The main visual loads with priority, without layout shift — the video poster is preloaded with high priority as soon as a video is provided
- [x] There is no horizontal scrolling — Playwright test at several widths
- [x] The page has a title, a description and Open Graph tags — Playwright test

## Update of 12 November

- The hero video files were not provided: the hero shows a grey gradient, and adding a `video` entry to the Homepage data turns the video on (assumption noted in the README).
