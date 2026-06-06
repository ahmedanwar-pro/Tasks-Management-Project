import type { ReactElement } from 'react';
import type { ProjectSummary } from '../card/project-card';
import { ProjectCard } from '../card/project-card';
import { AddProjectCard } from './add-project-card';

type ProjectsListProps = {
  projects: ProjectSummary[];
};

export function ProjectsList({ projects }: ProjectsListProps): ReactElement {
  return (
    <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:grid lg:grid-cols-3">
      <ul aria-label="Projects" className="contents">
        {projects.map((project) => (
          <ProjectCard className="lg:block" key={project.id} project={project} />
        ))}
      </ul>
      <AddProjectCard />
    </div>
  );
}
