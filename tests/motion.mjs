import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
const baseURL = process.env.FOLIO_TEST_URL || "http://localhost:5173";
const browser = await chromium.launch({ headless: true });
try {
  for (const reducedMotion of ["no-preference", "reduce"]) {
    const page = await browser.newPage({
      reducedMotion,
      viewport: { width: 1440, height: 1100 },
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${baseURL.replace(/\/$/, "")}/`);
    const toggle = page.getByRole("switch", { name: "Marketing emails" });
    await toggle.focus();
    await page.keyboard.press("Space");
    await expect(toggle).toBeChecked();
    const thumb = toggle
      .locator("xpath=ancestor::label")
      .locator("span[aria-hidden]");
    await expect
      .poll(() =>
        thumb.evaluate(
          (el) => new DOMMatrix(getComputedStyle(el).transform).m41,
        ),
      )
      .toBe(16);
    await page.getByRole("button", { name: "Toggle color theme" }).click();
    await expect(toggle).toBeChecked(); // Theme changes must not remount previews.
    const checkbox = page.getByRole("checkbox", {
      name: "Send me product updates",
    });
    await checkbox.focus();
    await page.keyboard.press("Space");
    await expect(checkbox).toBeChecked();
    const trigger = page.getByRole("button", {
      name: "Create project",
      exact: true,
    });
    await trigger.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect
      .poll(() =>
        page.locator(".modal").evaluate((el) => getComputedStyle(el).opacity),
      )
      .toBe("1");
    if (reducedMotion === "reduce")
      assert.equal(
        await page
          .locator(".modal")
          .evaluate((el) => getComputedStyle(el).transform),
        "none",
      );
    // Focus must remain in the dialog while keyboard navigation and exit run.
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      assert.equal(
        await dialog.evaluate((el) => el.contains(document.activeElement)),
        true,
      );
    }
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await trigger.click();
    await expect(dialog).toBeVisible();
    await page.mouse.click(5, 5);
    await expect(dialog).toHaveCount(0);
    // Keyboard navigation updates both the ARIA selection and the shared indicator.
    await page.getByRole("tab", { name: "Overview", exact: true }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("tab", { name: "Analytics", exact: true }),
    ).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toContainText("1,204");
    await expect(page.locator(".tab-indicator")).toHaveCount(1);
    const disabled = page.getByRole("button", {
      name: "Disabled",
      exact: true,
    });
    await expect(disabled).toBeDisabled();
    const registry = await (
      await page.request.get(`${baseURL}/r/folio.json`)
    ).json();
    assert.ok(registry.dependencies.includes("motion"));
    assert.ok(registry.files.some((file) => file.target === "@ui/dialog.tsx"));
    assert.deepEqual(errors, []);
    await page.close();
    console.log(
      `PASS: ${reducedMotion}: keyboard controls, persistent state, modal focus/exit, tabs, registry`,
    );
  }
} finally {
  await browser.close();
}
