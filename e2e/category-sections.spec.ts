import { expect, test, type Page } from "@playwright/test";

const breakpoints = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 1024, height: 768 },
  desktop: { width: 1440, height: 900 },
};

function sections(page: Page) {
  return page
    .getByRole("main")
    .getByRole("region")
    .filter({ hasNot: page.getByRole("heading", { level: 1 }) })
    .filter({ hasNot: page.getByRole("group", { name: "Best sellers" }) });
}

function cardSections(page: Page) {
  return sections(page).filter({
    has: page.getByRole("link", { name: /^Explore all products/ }),
  });
}

test.describe("mobile", () => {
  test.use({ viewport: breakpoints.mobile });

  test("the cards of every category section stack in one column", async ({
    page,
  }) => {
    await page.goto("/");

    const all = await cardSections(page).all();
    expect(all.length).toBeGreaterThan(0);
    for (const section of all) {
      const boxes = [];
      for (const card of await section.getByRole("article").all()) {
        boxes.push((await card.boundingBox())!);
      }

      for (const [index, box] of boxes.slice(1).entries()) {
        const above = boxes[index];
        expect(box.x).toBe(above.x);
        expect(box.y).toBeGreaterThan(above.y + above.height);
      }
    }
  });
});

type LayoutShift = PerformanceEntry & {
  value: number;
  hadRecentInput: boolean;
};

type MeasuredWindow = Window & { layoutShift?: number };

for (const [name, viewport] of Object.entries(breakpoints)) {
  test(`at ${name} width, the sections load their lazy images without shifting the page`, async ({
    page,
  }) => {
    // Sums the page's layout shifts.
    await page.addInitScript(() => {
      const measured = window as MeasuredWindow;
      measured.layoutShift = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as LayoutShift[]) {
          if (!entry.hadRecentInput) {
            measured.layoutShift = (measured.layoutShift ?? 0) + entry.value;
          }
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.setViewportSize(viewport);
    await page.goto("/");

    // Count only the shifts from the lazy images.
    await page.evaluate(() => ((window as MeasuredWindow).layoutShift = 0));
    for (const section of await sections(page).all()) {
      await section.scrollIntoViewIfNeeded();
      for (const image of await section.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() => image.evaluate((img: HTMLImageElement) => img.complete))
          .toBe(true);
      }
    }

    expect(
      await page.evaluate(() => (window as MeasuredWindow).layoutShift),
    ).toBe(0);
  });
}
