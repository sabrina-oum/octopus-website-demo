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

test("a keyboard user picks a colour with the arrow keys", async ({ page }) => {
  const colours = page.getByRole("radiogroup", { name: /^Colour - / });
  const radios = colours.getByRole("radio");

  let found = false;
  for (const candidate of await linkedProductPaths(page)) {
    await page.goto(candidate);
    if ((await radios.count()) >= 2) {
      found = true;
      break;
    }
  }
  test.skip(!found, "no linked product comes in two colours");

  const first = (await radios.nth(0).getAttribute("value"))!;
  const second = (await radios.nth(1).getAttribute("value"))!;
  await expect(colours).toHaveAccessibleName(`Colour - ${first}`);

  await radios.nth(0).focus();
  await page.keyboard.press("ArrowRight");

  await expect(radios.nth(1)).toBeChecked();
  await expect(radios.nth(1)).toBeFocused();
  await expect(colours).toHaveAccessibleName(`Colour - ${second}`);
  await expect(page.getByText(`Colour - ${second}`)).toBeVisible();
});

test("the colour dots have the Figma outlines: 20 % on white, 8 % on any other colour", async ({
  page,
}) => {
  await page.goto(path);

  const dots = await page
    .getByRole("radiogroup")
    .locator("span[aria-hidden]")
    .evaluateAll((spans) =>
      spans.map((dot) => {
        const style = getComputedStyle(dot);
        return { fill: style.backgroundColor, outline: style.borderColor };
      }),
    );
  expect(dots.length).toBeGreaterThan(0);

  for (const { fill, outline } of dots) {
    expect(outline, fill).toBe(
      fill === "rgb(255, 255, 255)"
        ? "rgba(0, 0, 0, 0.2)"
        : "rgba(0, 0, 0, 0.08)",
    );
  }
});

test("on mobile, « Where to buy » stays fixed at the bottom of the screen to the end of the page", async ({
  page,
}) => {
  const viewport = { width: 390, height: 844 };
  await page.setViewportSize(viewport);
  await page.goto(path);

  const bar = page.locator("main").getByRole("link", { name: "Where to buy" });
  const expectAtBottom = async () => {
    await expect(bar).toBeVisible();
    const box = await bar.boundingBox();
    expect(box!.y + box!.height).toBe(viewport.height - 10);
  };

  await expectAtBottom();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expectAtBottom();

  // The footer ends above the bar, not under it.
  const footer = await page.getByRole("contentinfo").boundingBox();
  const barTop = (await page.locator("[data-where-to-buy-bar]").boundingBox())!
    .y;
  expect(Math.round(footer!.y + footer!.height)).toBeLessThanOrEqual(
    Math.round(barTop),
  );
});

test("from tablet up, there is no « Where to buy » bar and no room left for it", async ({
  page,
}) => {
  await page.setViewportSize({ width: 810, height: 1000 });
  await page.goto(path);

  await expect(page.locator("[data-where-to-buy-bar]")).toBeHidden();
  expect(
    await page.evaluate(() => getComputedStyle(document.body).paddingBottom),
  ).toBe("0px");
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
