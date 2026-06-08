import type { ReactElement } from 'react';
import { PlusIcon } from '../../../shared/icons';
import { ListIcon } from '../icons/epic-details-modal-icons';

export function EpicDetailsTasksEmptyState(): ReactElement {
  return (
    <div className="border-border-strong bg-surface-low/50 md:bg-surface-low flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed p-[34px] md:p-[50px]">
      <div className="bg-surface-high text-primary md:bg-primary-container-muted md:text-text-primary/30 mb-3 flex size-12 items-center justify-center rounded-lg md:mb-4">
        <ListIcon />
      </div>
      <p className="text-body-sm leading-base text-text-tertiary md:text-body-md md:text-text-primary max-w-50 text-center md:max-w-none md:leading-relaxed md:font-medium">
        No tasks have been added to this epic yet
      </p>
      <button
        className="from-primary to-primary-container text-label-md text-text-inverse md:text-body-md mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-xs bg-linear-to-br px-4 leading-tight font-bold shadow-sm md:h-11 md:px-6 md:leading-relaxed md:font-semibold"
        type="button"
      >
        <PlusIcon className="size-[10.5px] md:size-3.5" />
        Add Task
      </button>
    </div>
  );
}
