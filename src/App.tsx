import { ScrollReveal } from "./components/ScrollReveal";
import { ProjectSection } from "./components/ProjectSection";
import { PROJECTS } from "./data/projects";

export function App() {
  return (
    <main className="page">
      <ScrollReveal className="hero">
        <h1>Vijay Singh</h1>
        <p>
          Senior software engineer building design systems and, lately, the tools that sit on top of
          them — static analysis, codemods, and retrieval, with an LLM added only where a
          deterministic rule genuinely can&apos;t do the job. Four projects below, each built from
          scratch, each with its own README and a real, measured number where an LLM is in the loop.
        </p>
      </ScrollReveal>

      {PROJECTS.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}

      <ScrollReveal className="contact">
        <h2>Contact</h2>
        <p className="contact-links">
          <a className="project-link project-link--live" href="mailto:vj2010sn@gmail.com">
            Email →
          </a>
          <a
            className="project-link project-link--live"
            href="https://www.linkedin.com/in/vijaysingh-75b335b4"
          >
            LinkedIn →
          </a>
          <a className="project-link project-link--live" href="https://github.com/Darth-koder007">
            GitHub →
          </a>
        </p>
      </ScrollReveal>
    </main>
  );
}
