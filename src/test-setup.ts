import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement matchMedia at all — ScrollReveal reads it on every render to check
// prefers-reduced-motion, so any test rendering it (directly or via ProjectSection) needs this.
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom doesn't implement IntersectionObserver either. This default never fires — tests that
// actually exercise the reveal behavior (ScrollReveal.test.tsx) stub their own controllable one.
if (!("IntersectionObserver" in window)) {
  class NoopIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-expect-error jsdom's lib.dom.d.ts expects a fuller implementation than this test stub provides
  window.IntersectionObserver = NoopIntersectionObserver;
}
