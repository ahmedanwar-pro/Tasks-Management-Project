import type { ReactElement } from 'react';
import { AddIcon, DraftingIcon, GridIcon, RocketIcon } from './empty-state-icons';

export function EmptyStateIllustration(): ReactElement {
  return (
    <div className="relative flex size-44 items-start justify-center md:size-56">
      <div className="bg-surface-high absolute -top-5 size-48 rounded-lg opacity-50 blur-3xl md:-top-8 md:size-64" />
      <div className="border-border-inverse/40 bg-surface relative flex size-44 items-center justify-center rounded-[28px] border p-px shadow-[0px_25px_50px_-12px_rgba(0,61,155,0.1)] backdrop-blur-[2px] md:size-56 md:rounded-[32px]">
        <div className="grid grid-cols-2 gap-3 p-6">
          <div className="bg-primary-container/20 text-primary-container flex size-14 items-center justify-center rounded-md md:size-16">
            <RocketIcon />
          </div>
          <div className="bg-primary-container-muted text-text-subtle flex size-14 items-center justify-center rounded-md md:size-16">
            <DraftingIcon />
          </div>
          <div className="bg-primary-container-muted text-text-subtle flex size-14 items-center justify-center rounded-md md:size-16">
            <GridIcon />
          </div>
          <div className="border-primary/20 bg-primary/5 text-primary/30 flex size-14 items-center justify-center rounded-md border-2 border-dashed p-0.5 md:size-16">
            <AddIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
