import type { ReactElement } from 'react';
import { ProjectsLoadingCard } from './projects-loading-card';

const loadingCards = Array.from({ length: 6 }, (_, index) => index);

export function ProjectsLoadingList(): ReactElement {
  return (
    <div
      aria-busy="true"
      aria-label="Loading projects"
      aria-live="polite"
      className="mt-5 flex flex-col gap-6 md:mt-0 md:grid md:grid-cols-3 md:gap-x-4 md:gap-y-3.5 lg:gap-x-5 lg:gap-y-3.5"
      role="status"
    >
      {loadingCards.map((card) => (
        <ProjectsLoadingCard key={card} />
      ))}
    </div>
  );
}
