import { expect, test, type Locator, type Page } from "@playwright/test";

// Product of the element's and its ancestors' opacity: what the visitor sees.
function seenOpacity(locator: Locator): Promise<number> {
  return locator.evaluate((element) => {
    let opacity = 1;
    for (let node: Element | null = element; node; node = node.parentElement) {
      opacity *= Number(getComputedStyle(node).opacity);
    }
    return opacity;
  });
}

function exploreTitle(page: Page) {
  return page.getByRole("heading", { name: "Explore all categories" });
}

test("a section below the fold appears once scrolled into view", async ({
  page,
}) => {
  await page.goto("/");
  const title = exploreTitle(page);

  expect(await seenOpacity(title)).toBe(0);
  await title.scrollIntoViewIfNeeded();
  await expect.poll(() => seenOpacity(title)).toBe(1);
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("the content fades in without moving", async ({ page }) => {
    await page.goto("/");
    const title = exploreTitle(page);
    const pageTop = () =>
      title.evaluate(
        (element) => element.getBoundingClientRect().top + scrollY,
      );

    const hiddenTop = await pageTop();
    await title.scrollIntoViewIfNeeded();
    await expect.poll(() => seenOpacity(title)).toBe(1);
    expect(await pageTop()).toBe(hiddenTop);
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the content below the fold is visible on both pages", async ({
    page,
  }) => {
    await page.goto("/");
    expect(await seenOpacity(exploreTitle(page))).toBe(1);

    await page.goto("/products/countertop-blender");
    expect(
      await seenOpacity(page.getByRole("heading", { name: "Downloads" })),
    ).toBe(1);
  });
});

test("the content still shows when the scripts fail to load", async ({
  page,
}) => {
  await page.route("**/*.js", (route) => route.abort());
  await page.goto("/");

  await expect.poll(() => seenOpacity(exploreTitle(page))).toBe(1);
});
