import { describe, it } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";
import axe from "axe-core";
import { Dialog } from "../src/components/ui/Dialog";
import { Marquee } from "../src/components/ui/Marquee";

describe("Automated accessibility checks", () => {
  it("reports no axe violations for the shared dialog primitive", async () => {
    const markup = renderToStaticMarkup(
      React.createElement(
        Dialog,
        {
          isOpen: true,
          onClose: () => undefined,
          title: "Accessible dialog",
          description: "Review details",
        },
        React.createElement("p", null, "Dialog content"),
      ),
    );
    const dom = new JSDOM(
      `<!doctype html><html lang="en"><head><title>Festora</title></head><body>${markup}</body></html>`,
      {
        url: "http://localhost",
      },
    );
    const results = await axe.run(dom.window.document.documentElement);
    assert.deepEqual(
      results.violations.map((violation) => violation.id),
      [],
      results.violations.map((violation) => `${violation.id}: ${violation.help}`).join("\n"),
    );
    dom.window.close();
  });

  it("reports no axe violations for the motion marquee control", async () => {
    const markup = renderToStaticMarkup(React.createElement(Marquee, { items: ["Wedding"] }));
    const dom = new JSDOM(
      `<!doctype html><html lang="en"><head><title>Festora</title></head><body>${markup}</body></html>`,
      {
        url: "http://localhost",
      },
    );
    const results = await axe.run(dom.window.document.documentElement);
    assert.deepEqual(
      results.violations.map((violation) => violation.id),
      [],
      results.violations.map((violation) => `${violation.id}: ${violation.help}`).join("\n"),
    );
    dom.window.close();
  });
});
