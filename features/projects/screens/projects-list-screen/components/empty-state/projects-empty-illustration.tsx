import type { ReactElement } from 'react';
import {
  BlueprintLayersIcon,
  CompassIcon,
  DraftingTriangleIcon,
} from './projects-empty-state-icons';

export function ProjectsEmptyIllustration(): ReactElement {
  return (
    <div className="bg-surface-low relative flex size-full items-center justify-center overflow-hidden rounded-md">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(180deg, var(--color-primary) 12px, transparent 12px), linear-gradient(90deg, var(--color-primary) 12px, transparent 12px)',
        }}
      />
      <div className="bg-primary-container-muted text-primary flex size-16 items-center justify-center rounded-lg shadow-[0px_20px_25px_-5px_rgba(4,27,60,0.05),0px_8px_10px_-6px_rgba(4,27,60,0.05)] lg:size-24">
        <CompassIcon />
      </div>
      <div className="bg-surface text-primary absolute top-[16%] right-[13%] flex size-9 -rotate-6 items-center justify-center rounded-sm shadow-sm lg:top-[37.62px] lg:right-[37.63px] lg:size-12">
        <BlueprintLayersIcon />
      </div>
      <div className="bg-surface text-text-muted absolute bottom-[14%] left-[13%] flex size-8 rotate-12 items-center justify-center rounded-sm shadow-sm lg:bottom-[44.29px] lg:left-[36.28px] lg:size-10">
        <DraftingTriangleIcon />
      </div>
    </div>
  );
}
