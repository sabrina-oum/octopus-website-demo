import { expect, test, type Page } from "@playwright/test";
import { expectSeoTags, linkedProductPaths } from "./support";

let path: string;

test.beforeEach(async ({ page }) => {
  [path] = await linkedProductPaths(page);
});

function hero(page: Page) {
  return page
    .getByRole("region")
    .filter({ has: page.getByRole("heading", { level: 1 }) });
}

test("the product page exposes its title, description and Open Graph tags", async ({
  page,
}) => {
  await page.goto(path);

  await expectSeoTags(page, path);
});

test("from tablet up, « Where to buy » sits under the colours", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(path);

  await expect(
    hero(page).getByRole("link", { name: "Where to buy" }),
  ).toBeVisible();

  const colours = await hero(page).getByRole("radiogroup").boundingBox();
  const link = await hero(page)
    .getByRole("link", { name: "Where to buy" })
    .boundingBox();
  expect(link!.y).toBeGreaterThan(colours!.y + colours!.height);
});

test("no width scrolls the product page horizontally", async ({ page }) => {
  await page.goto(path);

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
