import { expect, test, type Page } from "@playwright/test";
import { expectSeoTags } from "./support";

const breakpoints = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 1024, height: 768 },
  desktop: { width: 1440, height: 900 },
};

function hero(page: Page) {
  return page
    .getByRole("region")
    .filter({ has: page.getByRole("heading", { level: 1 }) });
}

for (const [name, viewport] of Object.entries(breakpoints)) {
  test(`the ${name} hero fills the first screen under the floating header`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");

    await expect(hero(page).getByRole("heading", { level: 1 })).toBeVisible();
    await expect(hero(page).getByRole("link")).toBeVisible();

    const box = await hero(page).boundingBox();
    expect(box?.y).toBe(0);
    expect(box?.height).toBe(viewport.height);

    const header = await page.getByRole("banner").boundingBox();
    const title = await hero(page).getByRole("heading").boundingBox();
    expect(title!.y).toBeGreaterThan(header!.y + header!.height);
  });
}

test("no width scrolls the page horizontally", async ({ page }) => {
  await page.goto("/");

  for (const width of [320, 390, 809, 810, 1024, 1199, 1200, 1440, 1920]) {
    await page.setViewportSize({ width, height: 800 });

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow, `horizontal overflow at ${width} px`).toBe(0);
  }
});

test("the homepage exposes its title, description and Open Graph tags", async ({
  page,
}) => {
  await page.goto("/");

  await expectSeoTags(page, "/");
  expect(
    await page
      .locator('meta[property="og:type"]')
      .first()
      .getAttribute("content"),
  ).toBe("website");
});
