import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const manifest = JSON.parse(await readFile("registry.json", "utf8"));
const base =
  (process.env.FOLIO_TEST_URL || "http://localhost:5173").replace(/\/$/, "") +
  "/";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
const warnings = [];
let current = "";
page.on("pageerror", (error) => errors.push(`${current}: ${error.message}`));
page.on("console", (message) => {
  if (message.type() === "error" || message.type() === "warning")
    warnings.push(`${current}: ${message.text()}`);
});
try {
  for (const item of process.env.FOLIO_INTERACTIONS_ONLY
    ? []
    : manifest.items) {
    current = item.name;
    await page.goto(`${base}#/components/${item.name}`);
    await expect(page.locator(".doc-preview")).toHaveAttribute(
      "data-component",
      item.name,
    );
    await expect(page.locator(".doc-example")).toBeVisible({ timeout: 20000 });
    await expect(
      page.getByText("This example could not load.", { exact: false }),
    ).toHaveCount(0);
    await expect(page.locator(".doc-code").first()).toContainText(
      `/r/${item.name}.json`,
    );
    if (
      [
        "calendar",
        "color-wheel",
        "table",
        "date-range-picker",
        "tree",
      ].includes(item.name)
    )
      await page.screenshot({ path: `/tmp/folio-${item.name}.png` });
    console.log(`PAGE ${item.name}`);
  }
  const preview = page.locator(".doc-preview");
  async function open(slug) {
    current = slug;
    console.log(`INTERACT ${slug}`);
    await page.goto(`${base}#/components/${slug}`);
    await expect(page.locator(".doc-example")).toBeVisible({ timeout: 20000 });
  }
  await open("number-field");
  await preview.getByRole("button", { name: "Add member" }).click();
  await expect(preview.getByRole("textbox")).toHaveValue("3");
  await open("radio-group");
  await preview.getByRole("radio", { name: /Yearly/ }).focus();
  await page.keyboard.press("Space");
  await expect(preview.getByRole("radio", { name: /Yearly/ })).toBeChecked();
  await open("slider");
  await preview.getByRole("slider").focus();
  await page.keyboard.press("ArrowRight");
  await expect(preview.getByRole("slider")).toHaveValue("41");
  await open("autocomplete");
  await preview.getByRole("searchbox").fill("vue");
  await expect(preview.getByRole("option")).toHaveCount(1);
  await expect(preview.getByRole("option")).toHaveText("Vue");
  await open("combo-box");
  await preview.getByRole("button", { name: "Show frameworks" }).click();
  await page.getByRole("option", { name: "React", exact: true }).click();
  await expect(preview.getByRole("combobox")).toHaveValue("React");
  await open("list-box");
  await preview.getByRole("option", { name: "Design system" }).click();
  await expect(
    preview.getByRole("option", { name: "Design system" }),
  ).toHaveAttribute("aria-selected", "true");
  await open("grid-list");
  await preview.getByRole("row", { name: "Design system" }).click();
  await expect(
    preview.getByRole("row", { name: "Design system" }),
  ).toHaveAttribute("aria-selected", "true");
  await open("menu");
  await preview.getByRole("button", { name: "Project actions" }).click();
  await page.getByRole("menuitem", { name: "Duplicate", exact: true }).click();
  await expect(preview.getByRole("status")).toContainText("Duplicate selected");
  await open("table");
  await preview.getByRole("row", { name: /Jane Doe/ }).click();
  await expect(preview.getByRole("row", { name: /Jane Doe/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await open("tag-group");
  await preview
    .getByRole("button", { name: "Remove React", exact: true })
    .click();
  await expect(
    preview.getByRole("button", { name: "Remove React", exact: true }),
  ).toHaveCount(0);
  await open("disclosure");
  await preview.getByRole("button").click();
  await expect(
    preview.getByText("Yes. Install the source and adapt it to your project."),
  ).toBeVisible();
  await open("disclosure-group");
  await preview
    .getByRole("button", { name: "Do I own the source code?" })
    .click();
  await preview.getByRole("button", { name: "Is it accessible?" }).click();
  await expect(
    preview.getByRole("button", { name: "Do I own the source code?" }),
  ).toHaveAttribute("aria-expanded", "false");
  await expect(
    preview.getByRole("button", { name: "Is it accessible?" }),
  ).toHaveAttribute("aria-expanded", "true");
  await open("calendar");
  const month = await preview.getByRole("heading").innerText();
  await preview.getByRole("button", { name: "Next month" }).click();
  await expect(preview.getByRole("heading")).not.toHaveText(month);
  await preview.getByRole("button").filter({ hasText: /^15$/ }).click();
  await expect(preview.locator("[data-selected]")).not.toHaveCount(0);
  await open("date-picker");
  await preview.getByRole("button", { name: "Choose dates" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("button")
    .filter({ hasText: /^15$/ })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    preview.getByRole("spinbutton", { name: /day/i }),
  ).toHaveAttribute("aria-valuenow", "15");
  await open("date-range-picker");
  await preview.getByRole("button", { name: "Choose dates" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button")
    .filter({ hasText: /^10$/ })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button")
    .filter({ hasText: /^15$/ })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await open("color-field");
  await preview.getByRole("textbox").fill("#ff0000");
  await preview.getByRole("textbox").press("Tab");
  await expect(preview.getByRole("textbox")).toHaveValue(/#FF0000/i);
  await open("color-picker");
  await preview.getByRole("textbox").fill("#ff0000");
  await preview.getByRole("textbox").press("Tab");
  await expect(preview.locator('[role="img"]').last()).toHaveCSS(
    "background-color",
    "rgb(255, 0, 0)",
  );
  await open("color-slider");
  const hue = preview.getByRole("slider");
  const beforeHue = Number(await hue.inputValue());
  await hue.focus();
  await page.keyboard.press("ArrowRight");
  await expect(hue).toHaveValue(String(beforeHue + 1));
  await open("color-area");
  const channel = preview.getByRole("slider").first();
  const beforeChannel = Number(await channel.inputValue());
  await channel.focus();
  await page.keyboard.press("ArrowRight");
  await expect(channel).toHaveValue(String(beforeChannel + 1));
  await open("color-wheel");
  const wheel = preview.getByRole("slider");
  const beforeWheel = Number(await wheel.inputValue());
  await wheel.focus();
  await page.keyboard.press("ArrowRight");
  await expect(wheel).toHaveValue(String(beforeWheel + 1));
  await open("color-swatch-picker");
  await preview.getByRole("option").nth(1).click();
  await expect(preview.getByRole("option").nth(1)).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await open("tree");
  await preview.getByRole("button", { name: /Components/ }).click();
  await expect(preview.getByText("Input", { exact: true })).toHaveCount(0);
  await preview.getByRole("button", { name: /Components/ }).click();
  await expect(preview.getByText("Input", { exact: true })).toBeVisible();
  await open("navigation-tree");
  await preview.getByRole("row", { name: "Button", exact: true }).click();
  await expect(page).toHaveURL(/#\/components\/button$/);
  await page.goBack();
  await expect(page.locator("#component-title")).toHaveText("Navigation Tree");
  await page.reload();
  await expect(page.locator("#component-title")).toHaveText("Navigation Tree");
  await open("virtualizer");
  await expect(preview.getByRole("option")).not.toHaveCount(1000);
  await preview.getByRole("listbox").evaluate((el) => {
    el.scrollTop = el.scrollHeight;
  });
  await expect(
    preview.getByRole("option", { name: "Project 1000", exact: true }),
  ).toBeVisible();
  await open("file-trigger");
  const picker = page.waitForEvent("filechooser");
  await preview.getByRole("button", { name: "Choose files" }).click();
  await (
    await picker
  ).setFiles({
    name: "folio.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("Folio"),
  });
  await expect(preview.getByRole("status")).toContainText("folio.txt");
  await open("drop-zone");
  const dropPicker = page.waitForEvent("filechooser");
  await preview.getByRole("button", { name: "Choose files" }).click();
  await (
    await dropPicker
  ).setFiles({
    name: "folio.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("Folio"),
  });
  await expect(preview.getByRole("status")).toContainText("1 files selected");
  await open("token-field");
  const tokenInput = preview.getByRole("textbox");
  await tokenInput.focus();
  await page.keyboard.press("End");
  await page.keyboard.type(" today");
  await expect(tokenInput).toContainText("today");
  await open("toast");
  await preview.getByRole("button", { name: "Show notification" }).click();
  await expect(
    page.getByText("Your project is up to date.", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Dismiss notification" }).click();
  await expect(
    page.getByText("Your project is up to date.", { exact: true }),
  ).toHaveCount(0);
  for (const slug of ["modal", "dialog", "popover"]) {
    await open(slug);
    const trigger = preview.getByRole("button");
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
  await open("preview-trigger");
  await page.mouse.move(0, 0);
  await preview.getByRole("button").hover();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await open("form");
  await preview.getByRole("button", { name: "Subscribe" }).click();
  await expect(preview.getByRole("textbox")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await preview.getByRole("textbox").fill("test@example.com");
  await preview.getByRole("button", { name: "Subscribe" }).click();
  await expect(preview.getByRole("status")).toContainText("You’re subscribed.");
  await open("toggle-button-group");
  await preview.getByRole("radio", { name: "Center" }).click();
  await expect(preview.getByRole("radio", { name: "Center" })).toBeChecked();
  await page.goto(`${base}#/components/not-a-component`);
  await expect(
    page.getByRole("heading", { name: "Component not found" }),
  ).toBeVisible();
  console.log(
    "PASS: collection, date, color, overlay, file, form and history interactions",
  );

  console.log("ERRORS", JSON.stringify(errors, null, 2));
  console.log("WARNINGS", JSON.stringify([...new Set(warnings)], null, 2));
  assert.deepEqual(errors, []);
  assert.deepEqual(warnings, []);
} finally {
  console.log("ERRORS", JSON.stringify(errors));
  console.log("WARNINGS", JSON.stringify([...new Set(warnings)]));
  await browser.close();
}
