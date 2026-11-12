import { expect, type Page } from "@playwright/test";

export async function linkedProductPaths(page: Page): Promise<string[]> {
  await page.goto("/");
  const hrefs = await page
    .getByRole("main")
    .locator('a[href^="/products/"]')
    .evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href") ?? ""),
    );
  const paths = [...new Set(hrefs)];
  expect(paths.length, "the homepage links to a product page").toBeGreaterThan(
    0,
  );
  return paths;
}

export async function expectSeoTags(page: Page, path: string) {
  const meta = (selector: string) =>
    page.locator(selector).first().getAttribute("content");

  const title = await page.title();
  expect(title).not.toBe("");
  expect(await meta('meta[property="og:title"]')).toBe(title);

  const description = await meta('meta[name="description"]');
  expect(description).toBeTruthy();
  expect(await meta('meta[property="og:description"]')).toBe(description);

  // The origin is the configured site URL, not the test server's.
  const url = new URL((await meta('meta[property="og:url"]'))!);
  expect(url.pathname).toBe(path);

  const image = await meta('meta[property="og:image"]');
  expect(image).toMatch(/^https?:\/\//);
  expect(Number(await meta('meta[property="og:image:width"]'))).toBeGreaterThan(
    0,
  );
  expect(
    Number(await meta('meta[property="og:image:height"]')),
  ).toBeGreaterThan(0);
  expect(await meta('meta[property="og:image:alt"]')).toBeTruthy();

  const response = await page.request.get(new URL(image!).pathname);
  expect(response.status(), `${image} answers`).toBe(200);
}
