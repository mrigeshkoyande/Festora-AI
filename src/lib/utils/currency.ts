/**
 * Festora AI — Currency & Financial Precision Utilities
 * Handles exact integer arithmetic, avoiding IEEE-754 floating-point inaccuracies.
 */

export interface CurrencyFormatOptions {
  currency?: string;
  showDecimals?: boolean;
}

/**
 * Formats a monetary amount into a culturally appropriate locale string (e.g. Indian Lakhs/Crores).
 * @param amountInRupees - The amount in full currency units (e.g. 4500000)
 * @param currencyCode - Standard 3-letter currency code (default: INR)
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
 */
export function formatCompactCurrency(
  amount: number,
  currencyCode: string = "INR"
): string {
  if (isNaN(amount) || !isFinite(amount)) return "₹0";

  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";

  if (currencyCode.toUpperCase() === "INR") {
    if (abs >= 10000000) {
      const cr = (abs / 10000000).toFixed(1).replace(/\.0$/, "");
      return `${sign}₹${cr} Cr`;
    }
    if (abs >= 100000) {
      const lakh = (abs / 100000).toFixed(1).replace(/\.0$/, "");
      return `${sign}₹${lakh} Lakhs`;
    }
    if (abs >= 1000) {
      const k = (abs / 1000).toFixed(0);
      return `${sign}₹${k}k`;
    }
    return `${sign}₹${abs}`;
  }

  if (abs >= 1000000) {
    const m = (abs / 1000000).toFixed(1).replace(/\.0$/, "");
    return `${sign}$${m}M`;
  }
  if (abs >= 1000) {
    const k = (abs / 1000).toFixed(0);
    return `${sign}$${k}k`;
  }
  return `${sign}$${abs}`;
}

/**
 * Converts whole rupees to paise (minor units) for safe integer arithmetic.
 */
export function toPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

/**
 * Converts paise back to whole rupees with safe rounding.
 */
export function toRupees(paise: number): number {
  return Math.round(paise) / 100;
}
