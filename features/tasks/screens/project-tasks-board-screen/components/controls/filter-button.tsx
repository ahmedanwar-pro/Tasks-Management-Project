import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { FilterIcon } from '../icons';

type FilterButtonProps = {
  className?: string;
};

export function FilterButton({ className }: FilterButtonProps): ReactElement {
  return (
    <button
      aria-label="Filter tasks"
      className={joinClasses(
        'bg-primary-container-muted text-text-primary hover:bg-surface-highest focus-visible:outline-primary flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
        className,
      )}
      type="button"
    >
      <FilterIcon />
    </button>
  );
}
