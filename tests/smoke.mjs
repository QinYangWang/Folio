import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
const baseURL = process.env.FOLIO_TEST_URL || "http://localhost:5173";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1100 },
  colorScheme: "light",
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(`${baseURL.replace(/\/$/, "")}/`);
await page
  .getByRole("heading", { name: "Small details. Better interfaces." })
  .waitFor();
assert.equal(await page.locator(".component-card").count(), 62);
await page.getByRole("button", { name: "Forms", exact: true }).click();
assert.equal(await page.locator(".component-card").count(), 14);
await page.getByRole("button", { name: "All components", exact: true }).click();
await page.getByRole("textbox", { name: "Search components" }).fill("switch");
assert.equal(await page.locator(".component-card").count(), 1);
await page.getByRole("textbox", { name: "Search components" }).fill("");
await page.getByText("Marketing emails", { exact: true }).click();
assert.equal(
  await page.getByRole("switch", { name: "Marketing emails" }).isChecked(),
  true,
);
await page.getByRole("button", { name: /Framework/ }).click();
await page.getByRole("option", { name: "React", exact: true }).click();
await expect(page.getByRole("button", { name: /Framework/ })).toContainText(
  "React",
);
await page.getByRole("button", { name: "Help", exact: true }).focus();
await page.keyboard.press("Shift+Tab");
await page.keyboard.press("Tab");
await expect(page.getByRole("tooltip")).toContainText("A little help");
await page.keyboard.press("Escape");
await page.getByRole("button", { name: "Create project", exact: true }).click();
await page.getByPlaceholder("My next big idea").fill("Browser smoke test");
await page
  .getByRole("dialog")
  .getByRole("button", { name: "Create project", exact: true })
  .click();
await page.locator(".toast").waitFor();
await page.locator('a.component-caption[href="#/components/button"]').click();
await expect(
  page.getByRole("heading", { name: "Button", exact: true }),
).toBeVisible();
await expect(page.locator(".doc-code").first()).toContainText(
  `${baseURL.replace(/\/$/, "")}/r/button.json`,
);
await page.goBack();
await expect(page.locator(".component-card")).toHaveCount(62);
const lightBackground = await page
  .locator(".component-card")
  .first()
  .evaluate((el) => getComputedStyle(el).backgroundColor);
await page.getByRole("button", { name: "Toggle color theme" }).click();
await page.waitForFunction(
  () => document.documentElement.dataset.mode === "dark",
);
const darkBackground = await page
  .locator(".component-card")
  .first()
  .evaluate((el) => getComputedStyle(el).backgroundColor);
assert.notEqual(darkBackground, lightBackground);
assert.equal(
  await page.locator(".app").evaluate((el) => getComputedStyle(el).filter),
  "none",
);
await page.getByRole("button", { name: "Create project", exact: true }).click();
assert.equal(
  await page
    .locator(".modal")
    .evaluate((el) => getComputedStyle(el).backgroundColor),
  darkBackground,
  "Portaled modal must inherit the dark surface",
);
await page.keyboard.press("Escape");
await page.screenshot({ path: "/tmp/folio-dark.png", fullPage: true });
await page.getByRole("button", { name: "Toggle color theme" }).click();
await page.waitForFunction(
  () => document.documentElement.dataset.mode === "light",
);
await page.screenshot({ path: "/tmp/folio-preview.png", fullPage: true });
await page
  .locator(".sidebar nav")
  .getByRole("button", { name: "Theming", exact: true })
  .click();
await expect(page.locator(".token-chip")).toHaveCount(54);
await page
  .locator(".sidebar nav")
  .getByRole("button", { name: "Components", exact: false })
  .click();
await page.setViewportSize({ width: 390, height: 844 });
assert.equal(
  await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  true,
);
await page.getByRole("button", { name: "Open navigation" }).click();
await page
  .locator(".sidebar nav")
  .getByRole("button", { name: "Blocks" })
  .click();
await page.getByRole("heading", { name: "A running start." }).waitFor();
await page.screenshot({ path: "/tmp/folio-mobile.png", fullPage: true });
const registry = await (
  await page.request.get(`${baseURL}/r/folio.json`)
).json();
assert.equal(registry.type, "registry:ui");
assert.ok(registry.files[0].content.includes("react-aria-components"));
assert.deepEqual(errors, []);
console.log(
  "PASS: catalog, filters, switches, dialogs, mobile layout, navigation, registry, light/dark tokens, portal theming, and no runtime errors",
);
await browser.close();
