import "@testing-library/jest-dom";

global.ResizeObserver = class ResizeObserverMock {
  disconnect() {}
  observe() {}
  unobserve() {}
};

import "./global-mocks";
