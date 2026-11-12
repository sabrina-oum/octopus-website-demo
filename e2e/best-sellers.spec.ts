import { expect, test, type Page } from "@playwright/test";

function bestSellers(page: Page) {
  return page.getByRole("group", { name: "Best sellers" });
}

function cards(page: Page) {
  return bestSellers(page).getByRole("article");
}

test.describe("touch screen", () => {
  test.use({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });

  test("a swipe moves the best sellers to the next card", async ({ page }) => {
    await page.goto("/");

    const firstCard = cards(page).first();
    await bestSellers(page).scrollIntoViewIfNeeded();
    await expect(
      bestSellers(page).getByRole("button", { name: /^Go to position 1 of/ }),
    ).toHaveAttribute("aria-current", "true");

    const box = (await firstCard.boundingBox())!;
    const y = box.y + box.height / 2;
    const cdp = await page.context().newCDPSession(page);
    const touch = (type: "touchStart" | "touchMove" | "touchEnd", x: number) =>
      cdp.send("Input.dispatchTouchEvent", {
        type,
        touchPoints: type === "touchEnd" ? [] : [{ x, y }],
      });

    await touch("touchStart", box.x + box.width - 20);
    for (let step = 1; step <= 10; step++) {
      await touch("touchMove", box.x + box.width - 20 - step * 20);
    }
    await touch("touchEnd", 0);

    await expect(
      bestSellers(page).getByRole("button", { name: /^Go to position 1 of/ }),
    ).not.toHaveAttribute("aria-current", "true");
    await expect(
      bestSellers(page).getByRole("button", { name: "Previous slide" }),
    ).toBeEnabled();
    await expect(cards(page).nth(1)).toBeInViewport({
      ratio: 1,
    });
  });
});

for (const viewport of [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  test.describe(`${viewport.width} px wide`, () => {
    test.use({ viewport });

    test("the last best seller stops at the page margin, like the first one", async ({
      page,
    }) => {
      await page.goto("/");
      await bestSellers(page).scrollIntoViewIfNeeded();

      const firstCard = cards(page).first();
      const lastCard = cards(page).last();
      const heading = page.getByRole("heading", { name: "Best sellers" });
      const next = bestSellers(page).getByRole("button", {
        name: "Next slide",
      });

      // The heading starts and the arrows end on the page margins.
      const pageLeft = (await heading.boundingBox())!.x;
      const nextBox = (await next.boundingBox())!;
      const pageRight = nextBox.x + nextBox.width;

      expect((await firstCard.boundingBox())!.x).toBeCloseTo(pageLeft, 0);

      await bestSellers(page)
        .getByRole("button", { name: /^Go to position/ })
        .last()
        .click();
      await expect(next).toBeDisabled();

      await expect(async () => {
        const box = (await lastCard.boundingBox())!;
        expect(box.x + box.width).toBeCloseTo(pageRight, 0);
      }).toPass();
    });
  });
}
