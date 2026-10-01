import { Badge, Card } from "@ds/components";
import { ScrollReveal } from "./ScrollReveal";
import type { ProjectEntry } from "../data/projects";

interface ProjectSectionProps {
  project: ProjectEntry;
}

export function ProjectSection({ project }: ProjectSectionProps) {
  return (
    <ScrollReveal className="project-section">
      <Card padding="lg">
        <h2>{project.name}</h2>
        <p className="project-pitch">{project.pitch}</p>
        <div className="project-tags">
          {project.tech.map((tag) => (
            <Badge key={tag} tone="neutral">
              {tag}
            </Badge>
          ))}
        </div>
        <blockquote className="project-pull-quote">{project.pullQuote}</blockquote>
        {project.status === "live" && project.url ? (
          <a className="project-link project-link--live" href={project.url}>
            View project →
          </a>
        ) : (
          <span
            className="project-link project-link--pending"
            aria-label={`${project.name}: in progress, not yet public`}
          >
            In progress
          </span>
        )}
      </Card>
    </ScrollReveal>
  );
}
