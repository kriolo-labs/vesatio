// E2E Tests - Client Portal (My Vesatio)
import { expect, test } from "@playwright/test";

const clientUser = { email: "cliente@example.com", password: "client123" };

test.describe("Portal Authentication", () => {
  test("portal login page loads", async ({ page }) => {
    await page.goto("/my-vesatio/login");

    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByText(/My Vesatio/i)).toBeVisible();
  });

  test("first access page is accessible", async ({ page }) => {
    await page.goto("/my-vesatio/primeiro-acesso");

    await expect(page.getByText(/Primeiro Acesso|Ativar/i)).toBeVisible();
  });
});

test.describe("Portal Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/my-vesatio/login");
    await page.fill('input[type="email"]', clientUser.email);
    await page.fill('input[type="password"]', clientUser.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(/my-vesatio/);
  });

  test("dashboard shows project info", async ({ page }) => {
    await page.goto("/my-vesatio");

    // Check greeting
    await expect(page.getByText(/Bom dia|Boa tarde|Boa noite/i)).toBeVisible();

    // Check project card
    await expect(page.getByText(/Progresso|Progress/i)).toBeVisible();
  });

  test("can access project timeline", async ({ page }) => {
    await page.goto("/my-vesatio/projeto/timeline");

    await expect(page.getByText(/Timeline/i)).toBeVisible();
    // Check phases are visible
    await expect(page.locator('[class*="phase"], [class*="card"]')).toHaveCount({ minimum: 1 });
  });
});

test.describe("Portal Documents (Vault)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/my-vesatio/login");
    await page.fill('input[type="email"]', clientUser.email);
    await page.fill('input[type="password"]', clientUser.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(/my-vesatio/);
  });

  test("can access vault", async ({ page }) => {
    await page.goto("/my-vesatio/vault");

    await expect(page.getByText(/Vault|Documentos/i)).toBeVisible();
    // Check folders exist
    await expect(page.getByText(/Contrato|Contract/i)).toBeVisible();
  });

  test("heritage timeline is accessible", async ({ page }) => {
    await page.goto("/my-vesatio/vault");

    await expect(page.getByText(/Heritage Timeline/i)).toBeVisible();
  });
});

test.describe("Portal Communication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/my-vesatio/login");
    await page.fill('input[type="email"]', clientUser.email);
    await page.fill('input[type="password"]', clientUser.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(/my-vesatio/);
  });

  test("can access chat", async ({ page }) => {
    await page.goto("/my-vesatio/chat");

    // Check chat interface
    await expect(page.locator('input[placeholder*="mensagem"]')).toBeVisible();
  });

  test("can send message", async ({ page }) => {
    await page.goto("/my-vesatio/chat");

    await page.fill('input[placeholder*="mensagem"]', "Olá, tenho uma dúvida");
    await page.click('button[type="submit"], button:has(svg)');

    // Message should appear in chat
    await expect(page.getByText("Olá, tenho uma dúvida")).toBeVisible();
  });
});

test.describe("Portal Financial", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/my-vesatio/login");
    await page.fill('input[type="email"]', clientUser.email);
    await page.fill('input[type="password"]', clientUser.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(/my-vesatio/);
  });

  test("can access financeiro", async ({ page }) => {
    await page.goto("/my-vesatio/financeiro");

    await expect(page.getByText(/Financeiro|Financial/i)).toBeVisible();
    await expect(page.getByText(/Valor|Contrato|Total/i)).toBeVisible();
  });

  test("can report divergence", async ({ page }) => {
    await page.goto("/my-vesatio/financeiro");

    const reportButton = page.getByRole("button", { name: /Reportar|Divergência/i });
    await expect(reportButton).toBeVisible();

    await reportButton.click();
    await expect(page.locator('dialog, [role="dialog"]')).toBeVisible();
  });
});

test.describe("Portal Bottom Navigation", () => {
  test("mobile navigation works", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/my-vesatio");

    // Check bottom nav exists
    const nav = page.locator('nav[class*="fixed"], nav[class*="bottom"]');
    await expect(nav).toBeVisible();

    // Navigate using bottom nav
    await page.click("text=Projeto");
    await expect(page).toHaveURL(/projeto/);
  });
});
