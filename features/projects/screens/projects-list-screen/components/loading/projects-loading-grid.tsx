import type { ReactElement } from 'react';
import { ProjectsLoadingCard } from './projects-loading-card';

const loadingCards = Array.from({ length: 6 }, (_, index) => index);

export function ProjectsLoadingGrid(): ReactElement {
  return (
    <div
      aria-hidden="true"
      className="mt-6 flex flex-col gap-6 opacity-40 lg:mt-10 lg:grid lg:grid-cols-3"
    >
      {loadingCards.map((card) => (
        <ProjectsLoadingCard key={card} />
      ))}
    </div>
  );
}
