import { expect, test, type Page } from "@playwright/test";

const breakpoints = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 1024, height: 768 },
  desktop: { width: 1440, height: 900 },
};

const categories = ["Kitchen", "Hair Care", "Home Security", "Accessories"];

function section(page: Page, name: string) {
  return page.getByRole("region", { name, exact: true });
}

function card(page: Page, sectionName: string, productName: string) {
  return section(page, sectionName)
    .getByRole("article")
    .filter({ has: page.getByRole("heading", { name: productName }) });
}

async function cardBox(page: Page, sectionName: string, productName: string) {
  const box = await card(page, sectionName, productName).boundingBox();
  if (!box) throw new Error(`The ${productName} card is not rendered`);
  return box;
}

async function top(page: Page, name: string) {
  const box = await section(page, name).boundingBox();
  if (!box) throw new Error(`The ${name} section is not rendered`);
  return box.y;
}

test("the category sections follow the hero in the Figma order", async ({
  page,
}) => {
  await page.goto("/");

  const tops = [];
  for (const name of categories) {
    await expect(section(page, name)).toBeVisible();
    tops.push(await top(page, name));
  }

  expect(tops).toEqual([...tops].sort((a, b) => a - b));
});

test("every « Learn more » of the sections leads to the Countertop Blender", async ({
  page,
}) => {
  await page.goto("/");

  for (const name of categories) {
    const links = section(page, name).getByRole("link", { name: "Learn more" });
    expect(await links.count(), `${name} has products`).toBeGreaterThan(0);

    for (const href of await links.evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href")),
    )) {
      expect(href, name).toBe("/products/countertop-blender");
    }
  }
});

test.describe("mobile", () => {
  test.use({ viewport: breakpoints.mobile });

  test("the rows become stacked columns", async ({ page }) => {
    await page.goto("/");

    const outdoor = await cardBox(
      page,
      "Home Security",
      "Octopus Outdoor Camera",
    );
    const indoor = await cardBox(
      page,
      "Home Security",
      "Octopus Indoor Camera",
    );

    expect(outdoor.x).toBe(indoor.x);
    expect(outdoor.y).toBeGreaterThan(indoor.y + indoor.height);
  });
});

test.describe("desktop", () => {
  test.use({ viewport: breakpoints.desktop });

  test("the large card sits beside the stacked cards in Home Security", async ({
    page,
  }) => {
    await page.goto("/");

    const doorbell = await cardBox(
      page,
      "Home Security",
      "Octopus Video Doorbell",
    );
    const indoor = await cardBox(
      page,
      "Home Security",
      "Octopus Indoor Camera",
    );
    const outdoor = await cardBox(
      page,
      "Home Security",
      "Octopus Outdoor Camera",
    );

    expect(indoor.x).toBeGreaterThan(doorbell.x + doorbell.width);
    expect(indoor.x).toBe(outdoor.x);
    expect(outdoor.y).toBeGreaterThan(indoor.y);
  });
});

type LayoutShift = PerformanceEntry & {
  value: number;
  hadRecentInput: boolean;
};

type MeasuredWindow = Window & { layoutShift?: number };

for (const [name, viewport] of Object.entries(breakpoints)) {
  test(`the ${name} sections load the photo cropped for ${name}, without shifting the page`, async ({
    page,
  }) => {
    // Sums the layout shifts (CLS entries) the page reports.
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

    const photo = section(page, "Kitchen").getByRole("img", {
      name: /^A woman blending/,
    });
    await expect(photo).toHaveAttribute("loading", "lazy");

    // Only the shifts caused while the lazy images below the fold load.
    await page.evaluate(() => ((window as MeasuredWindow).layoutShift = 0));
    for (const name of categories) {
      const images = section(page, name).getByRole("img");
      await section(page, name).scrollIntoViewIfNeeded();
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() => image.evaluate((img: HTMLImageElement) => img.complete))
          .toBe(true);
      }
    }

    await expect
      .poll(() =>
        photo.evaluate(
          (img: HTMLImageElement) => img.complete && img.currentSrc,
        ),
      )
      .toContain(encodeURIComponent(`/images/categories/kitchen-${name}.jpg`));
    expect(
      await page.evaluate(() => (window as MeasuredWindow).layoutShift),
    ).toBe(0);
  });
}
