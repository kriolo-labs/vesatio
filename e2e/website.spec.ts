// E2E Tests - Website Public Pages
import { expect, test } from "@playwright/test";

test.describe("Website Navigation", () => {
  test("homepage loads correctly", async ({ page }) => {
    await page.goto("/");

    // Check main elements
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    // Check hero section
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("navigates between pages", async ({ page }) => {
    await page.goto("/");

    // Navigate to Services
    await page.click("text=Serviços");
    await expect(page).toHaveURL(/services|servicos/);

    // Navigate to Portfolio
    await page.click("text=Portfolio");
    await expect(page).toHaveURL(/portfolio/);

    // Navigate to Contact
    await page.click("text=Contacto");
    await expect(page).toHaveURL(/contact/);
  });

  test("services pages are accessible", async ({ page }) => {
    // Woodwork
    await page.goto("/services/woodwork");
    await expect(page.locator("h1")).toContainText(/Marcenaria|Woodwork/i);

    // Smart Home
    await page.goto("/services/smart-home");
    await expect(page.locator("h1")).toContainText(/Smart|Inteligente/i);

    // Finishes
    await page.goto("/services/finishes");
    await expect(page.locator("h1")).toContainText(/Acabamentos|Finishes/i);
  });
});

test.describe("Admission Form", () => {
  test("form is accessible from homepage", async ({ page }) => {
    await page.goto("/");

    // Find CTA button
    const ctaButton = page.getByRole("link", { name: /Começar|Start|Admissão/i });
    await expect(ctaButton).toBeVisible();
  });

  test("form validates required fields", async ({ page }) => {
    await page.goto("/admissao");

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Check for validation messages
    await expect(page.locator("input:invalid")).toHaveCount({ minimum: 1 });
  });
});

test.describe("Responsiveness", () => {
  test("mobile menu works", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Check mobile menu button
    const menuButton = page.locator('[aria-label*="menu"]');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(page.locator("nav")).toBeVisible();
    }
  });

  test("content is readable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Check text is visible
    await expect(page.locator("h1")).toBeVisible();

    // Check no horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
  });
});
