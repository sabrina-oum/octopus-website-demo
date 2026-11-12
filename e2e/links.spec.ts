import { expect, test } from "@playwright/test";
import { linkedProductPaths } from "./support";

test("no link on the built pages is broken", async ({ page, request }) => {
  const builtPages = ["/", "/coming-soon", ...(await linkedProductPaths(page))];
  const targets = new Set<string>();

  for (const path of builtPages) {
    await page.goto(path);
    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((anchors) =>
        anchors.map((anchor) => (anchor as HTMLAnchorElement).href),
      );
    hrefs.forEach((href) => targets.add(href));
  }

  const origin = new URL(page.url()).origin;
  for (const target of targets) {
    const url = new URL(target);
    expect(url.origin, `${target} leaves the site`).toBe(origin);

    const response = await request.get(url.pathname);
    expect(response.status(), `${target} answers`).toBe(200);

    if (url.hash) {
      await page.goto(url.pathname);
      await expect(
        page.locator(`[id="${decodeURIComponent(url.hash.slice(1))}"]`),
        `${target} points to an existing anchor`,
      ).toHaveCount(1);
    }
  }
});
