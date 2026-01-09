// Unit Tests for Utility Functions
import { cn, formatCurrency } from "@/lib/utils";
import { describe, expect, it } from "vitest";

describe("formatCurrency", () => {
  it("formats positive numbers correctly", () => {
    expect(formatCurrency(1000)).toBe("1.000 CVE");
    expect(formatCurrency(1500000)).toBe("1.500.000 CVE");
  });

  it("formats zero correctly", () => {
    expect(formatCurrency(0)).toBe("0 CVE");
  });

  it("handles decimal values", () => {
    expect(formatCurrency(1234.56)).toContain("1.234");
  });

  it("handles negative values", () => {
    const result = formatCurrency(-1000);
    expect(result).toContain("1.000");
  });
});

describe("cn (classnames utility)", () => {
  it("merges class names correctly", () => {
    const result = cn("foo", "bar");
    expect(result).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    const result = cn("base", true && "included", false && "excluded");
    expect(result).toBe("base included");
  });

  it("handles undefined and null", () => {
    const result = cn("base", undefined, null, "end");
    expect(result).toBe("base end");
  });

  it("merges tailwind classes correctly", () => {
    const result = cn("p-4", "p-8");
    expect(result).toBe("p-8");
  });
});

// Calculation Tests
describe("Calculations", () => {
  it("calculates margin correctly", () => {
    const cost = 100;
    const price = 150;
    const margin = ((price - cost) / price) * 100;
    expect(margin).toBeCloseTo(33.33, 1);
  });

  it("calculates total with tax", () => {
    const subtotal = 1000;
    const taxRate = 0.15;
    const total = subtotal * (1 + taxRate);
    expect(total).toBe(1150);
  });

  it("calculates progress percentage", () => {
    const completed = 7;
    const total = 10;
    const progress = (completed / total) * 100;
    expect(progress).toBe(70);
  });
});

// Validation Tests
describe("Validations", () => {
  it("validates email format", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test("user@example.com")).toBe(true);
    expect(emailRegex.test("invalid-email")).toBe(false);
    expect(emailRegex.test("user@.com")).toBe(false);
  });

  it("validates phone number format", () => {
    const phoneRegex = /^\+?[0-9]{9,15}$/;
    expect(phoneRegex.test("+238991234567")).toBe(true);
    expect(phoneRegex.test("991234567")).toBe(true);
    expect(phoneRegex.test("123")).toBe(false);
  });

  it("validates NIF format (9 digits)", () => {
    const nifRegex = /^[0-9]{9}$/;
    expect(nifRegex.test("123456789")).toBe(true);
    expect(nifRegex.test("12345678")).toBe(false);
    expect(nifRegex.test("1234567890")).toBe(false);
  });
});
