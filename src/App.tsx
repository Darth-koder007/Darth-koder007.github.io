import { ScrollReveal } from "./components/ScrollReveal";
import { ProjectSection } from "./components/ProjectSection";
import { PROJECTS } from "./data/projects";
import { STATS, WORK } from "./data/profile";

function ContactLinks({ primaryResume = false }: { primaryResume?: boolean }) {
  return (
    <p className="contact-links">
      <a
        className={`project-link ${primaryResume ? "project-link--live" : "project-link--secondary"}`}
        href="/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Resume →
      </a>
      <a className="project-link project-link--secondary" href="mailto:vj2010sn@gmail.com">
        Email →
      </a>
      <a
        className="project-link project-link--secondary"
        href="https://www.linkedin.com/in/vijaysingh-75b335b4"
      >
        LinkedIn →
      </a>
      <a className="project-link project-link--secondary" href="https://github.com/Darth-koder007">
        GitHub →
      </a>
    </p>
  );
}

export function App() {
  return (
    <main className="page">
      {/* Not wrapped in ScrollReveal: the hero is the LCP element and must paint immediately. */}
      <header className="hero">
        <h1>Vijay Singh</h1>
        <p className="hero-role">
          Senior Software Engineer · Design systems, developer platforms &amp; applied AI
        </p>
        <p className="hero-pitch">
          I build and own design systems, the tooling around them, and the AI that makes them easier
          to adopt. Below: results from my work at Delivery Hero, and four projects built from
          scratch.
        </p>
        <ContactLinks primaryResume />
      </header>

      <section aria-labelledby="results-heading" className="section">
        <h2 id="results-heading" className="section-heading">
          Selected results at Delivery Hero
        </h2>
        <dl className="stats">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat">
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="work-heading" className="section">
        <h2 id="work-heading" className="section-heading">
          At work
        </h2>
        <ul className="work-grid">
          {WORK.map((item) => (
            <li key={item.id} className="work-item">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="projects-heading" className="section">
        <h2 id="projects-heading" className="section-heading">
          Personal projects
        </h2>
        <div className="project-grid">
          {PROJECTS.map((project) => (
            <ProjectSection key={project.id} project={project} />
          ))}
        </div>
      </section>

      <ScrollReveal className="contact">
        <h2 className="section-heading">Contact</h2>
        <ContactLinks />
      </ScrollReveal>
    </main>
  );
}
