import "@testing-library/jest-dom";
// eslint-disable-next-line no-restricted-imports
import "../node_modules/vitest/globals.d";

global.ResizeObserver = class ResizeObserverMock {
  disconnect() {}
  observe() {}
  unobserve() {}
};

Object.defineProperty(global.navigator, "language", {
  value: "de-DE",
  configurable: true,
  writable: true,
});

import "./global-mocks";
import "./standard-tests";
