import { expect, test, type Page } from "@playwright/test";

const breakpoints = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 1024, height: 768 },
  desktop: { width: 1440, height: 900 },
};

function hero(page: Page) {
  return page.getByRole("region", { name: "Octopus Ionic Hair Dryer" });
}

for (const [name, viewport] of Object.entries(breakpoints)) {
  test(`the ${name} hero fills the first screen under the floating header`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");

    await expect(
      hero(page).getByRole("heading", {
        level: 1,
        name: "Octopus Ionic Hair Dryer",
      }),
    ).toBeVisible();
    await expect(
      hero(page).getByRole("link", { name: "Learn more" }),
    ).toHaveAttribute("href", "/products/countertop-blender");

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
  request,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle(
    "Octopus | Kitchen, hair care and home security electronics",
  );

  const meta = (selector: string) =>
    page.locator(selector).first().getAttribute("content");

  expect(await meta('meta[name="description"]')).toContain(
    "Octopus Ionic Hair Dryer",
  );
  expect(await meta('meta[property="og:title"]')).toBe(
    "Octopus | Kitchen, hair care and home security electronics",
  );
  expect(await meta('meta[property="og:description"]')).toContain(
    "Octopus Ionic Hair Dryer",
  );
  expect(await meta('meta[property="og:type"]')).toBe("website");
  expect(await meta('meta[property="og:url"]')).toMatch(
    /^https?:\/\/[^/]+\/?$/,
  );

  const image = await meta('meta[property="og:image"]');
  expect(image).toMatch(
    /^https?:\/\/.+\/images\/og\/octopus-ionic-hair-dryer\.jpg$/,
  );
  expect(await meta('meta[property="og:image:width"]')).toBe("1200");
  expect(await meta('meta[property="og:image:height"]')).toBe("630");

  const response = await request.get(new URL(image!).pathname);
  expect(response.status()).toBe(200);
});
