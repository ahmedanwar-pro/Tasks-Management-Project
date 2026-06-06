import type { ReactElement } from 'react';
import { ProjectsLoadingGrid } from './projects-loading-grid';
import { ProjectsLoadingHeader } from './projects-loading-header';

export function ProjectsLoadingState(): ReactElement {
  return (
    <section
      aria-busy="true"
      aria-label="Loading projects"
      aria-live="polite"
      className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pt-9 pb-8 lg:px-8 lg:pt-8"
      role="status"
    >
      <ProjectsLoadingHeader />
      <ProjectsLoadingGrid />
    </section>
  );
}
