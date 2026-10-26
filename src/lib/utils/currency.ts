/**
 * Festora AI — Currency & Financial Precision Utilities
 * Handles exact integer arithmetic, avoiding IEEE-754 floating-point inaccuracies.
 */

export interface CurrencyFormatOptions {
  currency?: string;
  showDecimals?: boolean;
}

const ONE_CRORE = 10_000_000;
const ONE_LAKH = 100_000;
const ONE_THOUSAND = 1_000;
const ONE_MILLION = 1_000_000;

/**
 * Formats a monetary amount into a culturally appropriate locale string (e.g. Indian Lakhs/Crores).
 *
 * @param amountInRupees - The amount in full currency units (e.g. 4500000)
 * @param currencyCode - Standard 3-letter ISO-4217 currency code (default: "INR")
 * @returns Formatted currency string with appropriate locale separators (e.g. "₹45,00,000")
 * @complexity O(1) Time | O(1) Space
 */
export function formatCurrency(
  amountInRupees: number,
  currencyCode: string = "INR"
): string {
  if (isNaN(amountInRupees) || !isFinite(amountInRupees)) {
    return currencyCode === "INR" ? "₹0" : "$0";
  }

  const rounded = Math.round(amountInRupees);

  if (currencyCode.toUpperCase() === "INR") {
    // Format according to Indian numbering system (e.g. 45,00,000)
    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
    return formatter.format(rounded);
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  });
  return formatter.format(rounded);
}

/**
 * Formats large amounts into human-readable compact form (e.g. ₹45 Lakhs, ₹1.5 Cr).
 *
 * @param amount - Full monetary amount to compact
 * @param currencyCode - Standard 3-letter currency code (default: "INR")
 * @returns Compact readable notation
 * @complexity O(1) Time | O(1) Space
 */
export function formatCompactCurrency(
  amount: number,
  currencyCode: string = "INR"
): string {
  if (isNaN(amount) || !isFinite(amount)) return "₹0";

  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";

  if (currencyCode.toUpperCase() === "INR") {
    if (abs >= ONE_CRORE) {
      const cr = (abs / ONE_CRORE).toFixed(1).replace(/\.0$/, "");
      return `${sign}₹${cr} Cr`;
    }
    if (abs >= ONE_LAKH) {
      const lakh = (abs / ONE_LAKH).toFixed(1).replace(/\.0$/, "");
      return `${sign}₹${lakh} Lakhs`;
    }
    if (abs >= ONE_THOUSAND) {
      const k = (abs / ONE_THOUSAND).toFixed(0);
      return `${sign}₹${k}k`;
    }
    return `${sign}₹${abs}`;
  }

  if (abs >= ONE_MILLION) {
    const m = (abs / ONE_MILLION).toFixed(1).replace(/\.0$/, "");
    return `${sign}$${m}M`;
  }
  if (abs >= ONE_THOUSAND) {
    const k = (abs / ONE_THOUSAND).toFixed(0);
    return `${sign}$${k}k`;
  }
  return `${sign}$${abs}`;
}

/**
 * Converts whole rupees to paise (minor units) for safe integer arithmetic.
 *
 * @param rupees - Whole rupee amount
 * @returns Exact integer paise representation
 * @complexity O(1) Time | O(1) Space
 */
export function toPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

/**
 * Converts paise back to whole rupees with safe rounding.
 *
 * @param paise - Minor currency unit amount
 * @returns Rupee value with two decimal precision
 * @complexity O(1) Time | O(1) Space
 */
export function toRupees(paise: number): number {
  return Math.round(paise) / 100;
}
