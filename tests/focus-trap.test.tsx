import { describe, it } from "node:test";
import assert from "node:assert/strict";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { JSDOM } from "jsdom";
import { Dialog } from "../src/components/ui/Dialog";

describe("Overlay keyboard focus behavior", () => {
  it("traps Tab focus and restores focus to the opener", async () => {
    const dom = new JSDOM("<!doctype html><html><body></body></html>", {
      url: "http://localhost",
    });
    const previousWindow = globalThis.window;
    const previousDocument = globalThis.document;
    const previousHTMLElement = globalThis.HTMLElement;
    const reactEnvironment = globalThis as typeof globalThis & {
      IS_REACT_ACT_ENVIRONMENT?: boolean;
    };
    const previousActEnvironment = reactEnvironment.IS_REACT_ACT_ENVIRONMENT;
    reactEnvironment.IS_REACT_ACT_ENVIRONMENT = true;
    Object.assign(globalThis, {
      window: dom.window,
      document: dom.window.document,
      HTMLElement: dom.window.HTMLElement,
    });
    dom.window.requestAnimationFrame = (callback) => dom.window.setTimeout(callback, 0);
    dom.window.cancelAnimationFrame = (handle) => dom.window.clearTimeout(handle);

    const opener = dom.window.document.createElement("button");
    opener.textContent = "Open";
    dom.window.document.body.append(opener);
    opener.focus();
    const mount = dom.window.document.createElement("div");
    dom.window.document.body.append(mount);
    const root = createRoot(mount);
    let isOpen = true;

    const render = async () => {
      await act(async () => {
        root.render(
          React.createElement(
            Dialog,
            {
              isOpen,
              onClose: () => {
                isOpen = false;
              },
              title: "Focus test",
            },
            React.createElement("button", { type: "button" }, "Last control"),
          ),
        );
      });
      await new Promise((resolve) => dom.window.setTimeout(resolve, 5));
    };

    try {
      await render();
      const dialog = mount.querySelector('[role="dialog"]');
      assert.ok(dialog);
      const controls = Array.from(dialog.querySelectorAll("button"));
      const closeButton = controls[0];
      const lastButton = controls[1];
      lastButton.focus();
      dom.window.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Tab" }));
      assert.equal(dom.window.document.activeElement, closeButton);

      closeButton.focus();
      dom.window.dispatchEvent(
        new dom.window.KeyboardEvent("keydown", { key: "Tab", shiftKey: true }),
      );
      assert.equal(dom.window.document.activeElement, lastButton);

      isOpen = false;
      await render();
      assert.equal(dom.window.document.activeElement, opener);
    } finally {
      await act(async () => {
        root.unmount();
      });
      Object.assign(globalThis, {
        window: previousWindow,
        document: previousDocument,
        HTMLElement: previousHTMLElement,
      });
      reactEnvironment.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
      dom.window.close();
    }
  });
});
