import '@testing-library/jest-dom';

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as typeof ResizeObserver;

global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];

  constructor() {}

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
} as typeof IntersectionObserver;
