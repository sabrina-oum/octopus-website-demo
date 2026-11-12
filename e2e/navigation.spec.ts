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

    await expect(menu(page)).toBeVisible();

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
});

test("the tablet header folds the navigation into the menu", async ({
  page,
}) => {
  await page.setViewportSize(tablet);
  await page.goto("/");

  await expect(menuButton(page)).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
});

test("the desktop header shows the navigation instead of the menu", async ({
  page,
}) => {
  await page.setViewportSize(desktop);
  await page.goto("/");

  await expect(page.getByRole("navigation", { name: "Main" })).toBeVisible();
  await expect(menuButton(page)).toBeHidden();
});
