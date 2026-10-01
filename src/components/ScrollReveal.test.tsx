import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ScrollReveal } from "./ScrollReveal";

function mockMatchMedia(reducedMotion: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion") ? reducedMotion : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  );
}

interface ObserverCallback {
  (entries: Array<{ isIntersecting: boolean }>): void;
}

let observeSpy: ReturnType<typeof vi.fn>;
let disconnectSpy: ReturnType<typeof vi.fn>;
let capturedCallback: ObserverCallback | undefined;

function mockIntersectionObserver() {
  observeSpy = vi.fn();
  disconnectSpy = vi.fn();
  class FakeIntersectionObserver {
    constructor(callback: ObserverCallback) {
      capturedCallback = callback;
    }
    observe = observeSpy;
    disconnect = disconnectSpy;
  }
  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
}

describe("ScrollReveal", () => {
  beforeEach(() => {
    capturedCallback = undefined;
    mockIntersectionObserver();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("starts hidden and reveals once the IntersectionObserver reports it's in view", () => {
    mockMatchMedia(false);
    const { container } = render(
      <ScrollReveal>
        <p>content</p>
      </ScrollReveal>
    );

    const el = container.firstElementChild!;
    expect(el.className).not.toContain("scroll-reveal--visible");
    expect(observeSpy).toHaveBeenCalled();

    act(() => {
      capturedCallback!([{ isIntersecting: true }]);
    });

    expect(el.className).toContain("scroll-reveal--visible");
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it("stays hidden if the observer reports not intersecting", () => {
    mockMatchMedia(false);
    const { container } = render(
      <ScrollReveal>
        <p>content</p>
      </ScrollReveal>
    );

    act(() => {
      capturedCallback!([{ isIntersecting: false }]);
    });

    expect(container.firstElementChild!.className).not.toContain("scroll-reveal--visible");
  });

  it("renders already visible when the user prefers reduced motion, skipping the reveal animation entirely", () => {
    mockMatchMedia(true);
    const { container } = render(
      <ScrollReveal>
        <p>content</p>
      </ScrollReveal>
    );

    expect(container.firstElementChild!.className).toContain("scroll-reveal--visible");
    expect(observeSpy).not.toHaveBeenCalled();
  });
});
