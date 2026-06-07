import type { ReactElement } from 'react';

export function EpicDetailsTasksHeading(): ReactElement {
  return (
    <h3 className="text-text-tertiary md:text-title-md md:leading-title md:text-text-primary text-[11px] leading-[16.5px] font-bold tracking-[0.55px] uppercase md:font-semibold md:tracking-normal md:normal-case">
      <span className="md:hidden">Tasks</span>
      <span className="hidden md:inline">Tasks</span>
    </h3>
  );
}
