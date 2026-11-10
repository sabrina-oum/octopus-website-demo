import { expect, test, type Page } from "@playwright/test";

const mobile = { width: 390, height: 844 };
const tablet = { width: 1024, height: 768 };
const desktop = { width: 1280, height: 800 };

function menuButton(page: Page) {
  return page.getByRole("button", { name: "Open menu" });
}

function menu(page: Page) {
  return page.getByRole("dialog", { name: "Menu" });
}

test.describe("mobile menu", () => {
  test.use({ viewport: mobile, hasTouch: true });

  test("opens and closes with taps", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).tap();
    await expect(menu(page)).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).tap();
    await expect(menu(page)).toBeHidden();

    await menuButton(page).tap();
    await page.touchscreen.tap(195, 700);
    await expect(menu(page)).toBeHidden();
  });

  test("opens, closes on Escape and gives focus back to its button", async ({
    page,
  }) => {
    await page.goto("/");
    await menuButton(page).click();

    await expect(menu(page).getByRole("link", { name: "Kitchen" })).toBeVisible();
    await expect(
      menu(page).getByRole("link", { name: "Where to buy" }),
    ).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(menu(page)).toBeHidden();
    await expect(menuButton(page)).toBeFocused();
    await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
  });

  test("opens and closes with the keyboard alone", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).focus();
    await page.keyboard.press("Enter");

    await expect(menu(page)).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).focus();
    await page.keyboard.press("Enter");

    await expect(menu(page)).toBeHidden();
    await expect(menuButton(page)).toBeFocused();
  });

  test("closes and leads to Coming soon once a link is chosen", async ({
    page,
  }) => {
    await page.goto("/");
    await menuButton(page).click();
    await menu(page).getByRole("link", { name: "Where to buy" }).click();

    await expect(page).toHaveURL("/coming-soon");
    await expect(
      page.getByRole("heading", { level: 1, name: "Coming soon" }),
    ).toBeVisible();
    await expect(menu(page)).toBeHidden();
  });

  test("keeps the page still while open and closes on a click outside", async ({
    page,
  }) => {
    await page.goto("/");
    await menuButton(page).click();
    await expect(menu(page)).toBeVisible();

    await page.mouse.move(195, 700);
    await page.mouse.wheel(0, 600);
    await page.keyboard.press("PageDown");
    await page.keyboard.press("End");
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);

    await page.mouse.click(195, 700);
    await expect(menu(page)).toBeHidden();
  });

  test("closes when the window is widened to desktop", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).click();
    await expect(menu(page)).toBeVisible();

    await page.setViewportSize(desktop);

    await expect(menu(page)).toBeHidden();
    await expect(page.getByRole("navigation", { name: "Main" })).toBeVisible();
  });
});

test("the tablet header folds the navigation into the menu", async ({
  page,
}) => {
  await page.setViewportSize(tablet);
  await page.goto("/");

  await expect(menuButton(page)).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
});

test("the desktop header shows the full navigation and « Where to buy »", async ({
  page,
}) => {
  await page.setViewportSize(desktop);
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("link", { name: "Kitchen" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Where to buy" })).toBeVisible();
  await expect(menuButton(page)).toBeHidden();
});
