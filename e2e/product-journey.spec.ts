import { expect, test } from "@playwright/test";

test("a visitor goes from the homepage card to the product page", async ({
  page,
}) => {
  await page.goto("/");

  const card = page.getByRole("article").filter({
    has: page.getByRole("heading", { name: "Countertop Blender" }),
  });
  await expect(
    card.getByRole("img", { name: "Countertop Blender" }),
  ).toBeVisible();

  await card.getByRole("link", { name: "Learn more" }).click();

  await expect(page).toHaveURL("/products/countertop-blender");
  await expect(
    page.getByRole("heading", { level: 1, name: "Countertop Blender" }),
  ).toBeVisible();
});

test("an unknown product slug answers 404", async ({ page }) => {
  const response = await page.goto("/products/does-not-exist");

  expect(response?.status()).toBe(404);
});
