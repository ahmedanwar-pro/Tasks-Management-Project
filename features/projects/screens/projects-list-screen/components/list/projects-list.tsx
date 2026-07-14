import type { ReactElement } from 'react';
import type { ProjectListItem } from '../../types';
import { ProjectCard } from '../card/project-card';
import { AddProjectCard } from './add-project-card';

type ProjectsListProps = {
  currentPage: number;
  projects: ProjectListItem[];
};

export function ProjectsList({
  currentPage,
  projects,
}: ProjectsListProps): ReactElement {
  return (
    <div className="mt-5 flex flex-col gap-6 lg:mt-6 lg:grid lg:grid-cols-3">
      <ul aria-label="Projects" className="contents">
        {projects.map((project) => (
          <ProjectCard
            className="lg:block"
            currentPage={currentPage}
            key={project.id}
            project={project}
          />
        ))}
      </ul>
      <AddProjectCard currentPage={currentPage} />
    </div>
  );
}
