import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectSection } from "./ProjectSection";
import type { ProjectEntry } from "../data/projects";

function makeProject(overrides: Partial<ProjectEntry> = {}): ProjectEntry {
  return {
    id: "test-project",
    name: "Test Project",
    pitch: "A test project pitch.",
    tech: ["TypeScript", "React"],
    pullQuote: "A real pull quote.",
    status: "in-progress",
    ...overrides,
  };
}

describe("ProjectSection", () => {
  it("renders the name, pitch, tech tags, and pull quote", () => {
    render(<ProjectSection project={makeProject()} />);

    expect(screen.getByRole("heading", { name: "Test Project" })).toBeInTheDocument();
    expect(screen.getByText("A test project pitch.")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("A real pull quote.")).toBeInTheDocument();
  });

  it("renders a non-interactive 'in progress' marker for an unfinished project, never a dead link", () => {
    render(<ProjectSection project={makeProject({ status: "in-progress" })} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("In progress")).toBeInTheDocument();
  });

  it("renders a real link with the configured URL for a live project", () => {
    render(
      <ProjectSection
        project={makeProject({ status: "live", url: "https://example.com/live-project" })}
      />
    );

    const link = screen.getByRole("link", { name: /view project/i });
    expect(link).toHaveAttribute("href", "https://example.com/live-project");
  });

  it("falls back to the in-progress marker if status is live but no url is configured", () => {
    render(<ProjectSection project={makeProject({ status: "live" })} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("In progress")).toBeInTheDocument();
  });
});
