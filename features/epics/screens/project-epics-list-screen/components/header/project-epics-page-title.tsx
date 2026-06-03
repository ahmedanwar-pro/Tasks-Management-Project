import type { ReactElement } from 'react';

export function ProjectEpicsPageTitle(): ReactElement {
  return (
    <h1
      className="text-text-primary sr-only text-[30px] leading-9 font-bold tracking-[-0.75px] lg:not-sr-only"
      id="project-epics-title"
    >
      Project Epics
    </h1>
  );
}
