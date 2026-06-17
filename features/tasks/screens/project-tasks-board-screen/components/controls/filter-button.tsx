import type { ReactElement } from 'react';
import { FilterIcon } from '../icons';

export function FilterButton(): ReactElement {
  return (
    <button
      aria-label="Filter tasks"
      className="bg-primary-container-muted text-text-primary hover:bg-surface-highest focus-visible:outline-primary flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      type="button"
    >
      <FilterIcon />
    </button>
  );
}
