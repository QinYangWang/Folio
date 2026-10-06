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
  async function checkFrames() {
    const issues = await page.locator(".component-card").evaluateAll((cards) =>
      cards.flatMap((card) => {
        const frame = card.querySelector(".component-preview");
        const caption = card.querySelector(".component-caption");
        const name = caption.querySelector("strong").textContent;
        const content =
          frame.querySelector("[data-preview-ready]") ||
          Array.from(frame.children).find(
            (el) => el.getBoundingClientRect().width > 0,
          );
        const f = frame.getBoundingClientRect(),
          c = content.getBoundingClientRect();
        return frame.scrollHeight > frame.clientHeight + 1 ||
          frame.scrollWidth > frame.clientWidth + 1 ||
          c.bottom > f.bottom - 8 ||
          c.top < f.top + 8
          ? [name]
          : [];
      }),
    );
    assert.deepEqual(
      issues,
      [],
      "Preview content must fit without clipping or internal frame scrolling",
    );
  }
  await checkFrames();
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
  await checkFrames();
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await checkFrames();
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Page overflows at ${width}px`,
    );
  }
  assert.deepEqual(errors, []);
  console.log(
    "PASS: 62 catalog cards, 50 lazy examples, interactive state, mobile layout, no runtime errors",
  );
} finally {
  await browser.close();
}
