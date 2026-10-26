import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  formatCurrency,
  formatCompactCurrency,
  toPaise,
  toRupees,
} from "../src/lib/utils/currency";

describe("Currency & Monetary Precision Utilities", () => {
  it("formats standard amounts in INR currency format", () => {
    const formatted = formatCurrency(4500000);
    // Should format with ₹ and proper Indian numbering commas
    assert.match(formatted, /₹\s?45,00,000/);
  });

  it("formats zero and small amounts correctly", () => {
    const zero = formatCurrency(0);
    assert.match(zero, /₹\s?0/);
    const small = formatCurrency(500);
    assert.match(small, /₹\s?500/);
  });

  it("formats compact currency for Lakhs, Crores, and Thousands", () => {
    assert.equal(formatCompactCurrency(4500000), "₹45 Lakhs");
    assert.equal(formatCompactCurrency(15000000), "₹1.5 Cr");
    assert.equal(formatCompactCurrency(50000), "₹50k");
    assert.equal(formatCompactCurrency(800), "₹800");
  });

  it("converts rupees to paise in integer arithmetic without floating error", () => {
    assert.equal(toPaise(100), 10000);
    assert.equal(toPaise(45.5), 4550);
    assert.equal(toPaise(0.99), 99);
  });

  it("converts paise to rupees accurately", () => {
    assert.equal(toRupees(10000), 100);
    assert.equal(toRupees(4550), 45.5);
    assert.equal(toRupees(99), 0.99);
  });
});
