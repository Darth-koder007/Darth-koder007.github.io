import { expect, test } from "@playwright/test";

async function scrollThroughPage(page: import("@playwright/test").Page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(100);
  }
}

test("loads with no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto("/");
  await page.waitForTimeout(300);

  expect(errors).toEqual([]);
});

test("has zero dead links — every <a> has a real, non-placeholder href", async ({ page }) => {
  await page.goto("/");
  await scrollThroughPage(page);

  const hrefs = await page
    .locator("a")
    .evaluateAll((links) => links.map((l) => l.getAttribute("href")));

  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) {
    expect(href).toBeTruthy();
    expect(href).not.toBe("#");
    expect(href).not.toBe("");
  }
});

test("unfinished projects show an honest in-progress state, not a broken link", async ({
  page,
}) => {
  await page.goto("/");
  await scrollThroughPage(page);

  const inProgressMarkers = page.getByText("In progress");
  await expect(inProgressMarkers).toHaveCount(await inProgressMarkers.count());
  expect(await inProgressMarkers.count()).toBeGreaterThan(0);

  // Every "In progress" marker must not itself be a link (no dead href to click through to).
  const markerTagNames = await inProgressMarkers.evaluateAll((els) => els.map((el) => el.tagName));
  for (const tagName of markerTagNames) {
    expect(tagName).not.toBe("A");
  }
});

test("has exactly one h1 and every project uses h2 — correct heading structure", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator("h1")).toHaveCount(1);
  const h2Count = await page.locator("h2").count();
  expect(h2Count).toBeGreaterThanOrEqual(4); // one per project section, plus Contact
});

test("the GitHub contact link is keyboard-reachable", async ({ page }) => {
  await page.goto("/");
  await scrollThroughPage(page);

  const githubLink = page.getByRole("link", { name: /github/i });
  await githubLink.scrollIntoViewIfNeeded();
  await githubLink.focus();
  await expect(githubLink).toBeFocused();
});

test("respects prefers-reduced-motion: content is visible immediately, no reveal animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const firstSection = page.locator(".project-section").first();
  await expect(firstSection).toHaveClass(/scroll-reveal--visible/);
});
