import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
const base = (process.env.FOLIO_TEST_URL || "http://localhost:5173").replace(
  /\/$/,
  "",
);
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`${base}/#/components`);
  await expect(page.locator(".component-card")).toHaveCount(62);
  await expect(page.locator(".catalog-placeholder")).toHaveCount(0);
  const previews = page.locator("[data-preview]");
  await expect(previews).toHaveCount(50);
  for (let i = 0; i < 50; i++) {
    const preview = previews.nth(i);
    await preview.scrollIntoViewIfNeeded();
    await expect(preview.locator("[data-preview-ready]")).toBeVisible();
    await expect(preview.getByRole("alert")).toHaveCount(0);
  }
  const number = page.locator('[data-preview="number-field"]');
  await number.getByRole("button", { name: "Add member" }).click();
  await expect(number.getByRole("textbox")).toHaveValue("3");
  await page.locator('[data-preview="calendar"]').scrollIntoViewIfNeeded();
  await expect(number.getByRole("textbox")).toHaveValue("3");
  await page.setViewportSize({ width: 390, height: 844 });
  for (let i = 0; i < 50; i++) {
    await previews.nth(i).scrollIntoViewIfNeeded();
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      "Catalog overflows mobile viewport",
    );
  }
  assert.deepEqual(errors, []);
  console.log(
    "PASS: 62 catalog cards, 50 lazy examples, interactive state, mobile layout, no runtime errors",
  );
} finally {
  await browser.close();
}
