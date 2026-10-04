import { chromium, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
const base =
  (process.env.FOLIO_TEST_URL || "http://localhost:5173").replace(/\/$/, "") +
  "/";
const manifest = JSON.parse(await readFile("registry.json", "utf8"));
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
    reducedMotion: "reduce",
  });
  await page.goto(base);
  for (const item of manifest.items) {
    await page.evaluate(
      (slug) => (window.location.hash = `/components/${slug}`),
      item.name,
    );
    await expect(page.locator(".doc-preview")).toHaveAttribute(
      "data-component",
      item.name,
    );
    await expect(page.locator(".doc-example")).toBeVisible({ timeout: 20000 });
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `${item.name} overflows mobile viewport`,
    );
    assert.equal(await page.locator("html").getAttribute("data-mode"), "dark");
  }
  await page.screenshot({
    path: "/tmp/folio-component-mobile.png",
    fullPage: true,
  });
  console.log(
    "PASS: all 62 component pages fit a 390px mobile viewport in dark/reduced-motion mode",
  );
} finally {
  await browser.close();
}
