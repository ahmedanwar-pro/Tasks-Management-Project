import type { ReactElement } from 'react';

export function EmptyStateContent(): ReactElement {
  return (
    <div className="flex max-w-md flex-col items-center text-center">
      <h1
        className="text-text-primary text-headline-md leading-section tracking-heading font-semibold md:text-[30px] md:leading-[36px] md:tracking-[-0.75px]"
        id="project-epics-empty-title"
      >
        No epics in this project yet.
      </h1>
      <p className="text-text-secondary text-body-md mt-3 max-w-100.5 leading-relaxed md:mt-4 md:text-[18px] md:leading-[29.25px]">
        Break down your large project into manageable epics to track progress
        better and maintain architectural clarity.
      </p>
    </div>
  );
}
