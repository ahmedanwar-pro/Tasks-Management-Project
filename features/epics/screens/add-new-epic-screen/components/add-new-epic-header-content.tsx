import type { ReactElement } from 'react';

export function AddNewEpicHeaderContent(): ReactElement {
  return (
    <div className="flex flex-col gap-1.5 lg:gap-2">
      <h1
        className="text-text-primary text-headline-md lg:leading-display lg:text-[36px] lg:font-bold lg:tracking-[-0.9px]"
        id="add-new-epic-title"
      >
        Create New Epic
      </h1>
      <p className="text-text-secondary lg:text-body-md max-w-lg text-[14px] leading-[22.75px] lg:leading-relaxed">
        <span className="lg:hidden">
          Define a high-level goal and organizational structure for your
          architectural phase.
        </span>
        <span className="hidden lg:inline">
          Define a major project phase or high-level milestone to group related
          tasks and track architectural progress.
        </span>
      </p>
    </div>
  );
}
