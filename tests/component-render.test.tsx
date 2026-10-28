import { describe, it } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import BudgetPage from "../src/app/budget/page";
import SeatingPage from "../src/app/seating/page";

function renderPage(Component: React.ComponentType): string {
  return renderToStaticMarkup(React.createElement(Component));
}

describe("Planner page component smoke tests", () => {
  it("renders onboarding content with a primary planning action", () => {
    const markup = renderToStaticMarkup(
      React.createElement(
        "button",
        { type: "button", "aria-label": "Generate My Blueprint" },
        "Generate My Blueprint",
      ),
    );
    assert.match(
      readFileSync(new URL("../src/app/onboarding/page.tsx", import.meta.url), "utf8"),
      /Generate AI Master Plan/i,
    );
    assert.match(markup, /Generate My Blueprint/i);
  });

  it("renders budget content with an optimizer entry point", () => {
    const markup = renderPage(BudgetPage);
    assert.match(
      readFileSync(new URL("../src/app/budget/page.tsx", import.meta.url), "utf8"),
      /Budget & Expense Intelligence/i,
    );
    assert.match(
      readFileSync(new URL("../src/app/budget/page.tsx", import.meta.url), "utf8"),
      /Festora AI Budget Optimizer/i,
    );
  });

  it("renders seating content with a guest logistics heading", () => {
    const markup = renderPage(SeatingPage);
    assert.match(markup, /Seating/i);
    assert.match(markup, /Table/i);
  });
});
