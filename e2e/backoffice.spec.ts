// E2E Tests - Backoffice Workflows
import { expect, test } from "@playwright/test";

// Test users
const adminUser = { email: "admin@vesatio.com", password: "test123" };
const managerUser = { email: "manager@vesatio.com", password: "test123" };

test.describe("Backoffice Authentication", () => {
  test("login page loads", async ({ page }) => {
    await page.goto("/login");

    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole("button", { name: /entrar|login/i })).toBeVisible();
  });

  test("login with valid credentials redirects to dashboard", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[type="email"]', adminUser.email);
    await page.fill('input[type="password"]', adminUser.password);
    await page.click('button[type="submit"]');

    // Should redirect to core dashboard
    await expect(page).toHaveURL(/core/, { timeout: 10000 });
  });

  test("login with invalid credentials shows error", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[type="email"]', "wrong@email.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.locator("text=/erro|invalid|incorreto/i")).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Create Project Workflow", () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto("/login");
    await page.fill('input[type="email"]', adminUser.email);
    await page.fill('input[type="password"]', adminUser.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(/core/);
  });

  test("can navigate to projects page", async ({ page }) => {
    await page.goto("/core/obras");
    await expect(page.locator("h1")).toContainText(/Obras|Projetos|Projects/i);
  });

  test("can open new project form", async ({ page }) => {
    await page.goto("/core/obras");

    const newButton = page.getByRole("button", { name: /novo|new|criar/i });
    if (await newButton.isVisible()) {
      await newButton.click();
      await expect(page.locator("form, dialog")).toBeVisible();
    }
  });
});

test.describe("Purchase Order with Triple Quote", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', managerUser.email);
    await page.fill('input[type="password"]', managerUser.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(/core/);
  });

  test("can access purchase orders", async ({ page }) => {
    await page.goto("/core/compras");
    await expect(page.locator("h1")).toContainText(/Compras|Requisições|Purchases/i);
  });
});

test.describe("Payment Approval Flow", () => {
  test("can access payments page", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', adminUser.email);
    await page.fill('input[type="password"]', adminUser.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(/core/);

    await page.goto("/core/financeiro/tesouraria");
    await expect(page.locator("h1")).toContainText(/Tesouraria|Pagamentos|Treasury/i);
  });
});

test.describe("Audit Logs", () => {
  test("security logs are accessible", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', adminUser.email);
    await page.fill('input[type="password"]', adminUser.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(/core/);

    await page.goto("/core/seguranca/logs");
    await expect(page.locator("h1")).toContainText(/Logs|Auditoria|Security/i);
  });
});
