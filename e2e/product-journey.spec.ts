import { expect, test } from "@playwright/test";

test("a visitor goes from a homepage card to that product's page", async ({
  page,
}) => {
  await page.goto("/");

  const learnMore = page.getByRole("link", { name: "Learn more" });
  const card = page
    .getByRole("main")
    .getByRole("article")
    .filter({ has: learnMore.and(page.locator('[href^="/products/"]')) })
    .first();
  const link = card.getByRole("link", { name: "Learn more" });
  await expect(card.getByRole("img")).toBeVisible();

  const name = await card.getByRole("heading").first().textContent();
  const href = await link.getAttribute("href");

  await link.click();

  await expect(page).toHaveURL(href!);
  await expect(
    page.getByRole("heading", { level: 1, name: name!, exact: true }),
  ).toBeVisible();
});

test("an unknown product slug answers 404", async ({ page }) => {
  const response = await page.goto("/products/does-not-exist");

  expect(response?.status()).toBe(404);
});
