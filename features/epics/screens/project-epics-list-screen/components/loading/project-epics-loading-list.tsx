import type { ReactElement } from 'react';
import { ProjectEpicLoadingCard } from './project-epic-loading-card';

const loadingCards = Array.from({ length: 6 }, (_, index) => index);

export function ProjectEpicsLoadingList(): ReactElement {
  return (
    <div
      aria-busy="true"
      aria-label="Loading project epics"
      aria-live="polite"
      className="mt-6 grid w-full gap-6 lg:mt-10 lg:grid-cols-2"
      role="status"
    >
      {loadingCards.map((card, index) => (
        <ProjectEpicLoadingCard hideOnMobile={index > 3} key={card} />
      ))}
    </div>
  );
}
