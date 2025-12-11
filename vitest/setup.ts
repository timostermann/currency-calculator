import "@testing-library/jest-dom";

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
