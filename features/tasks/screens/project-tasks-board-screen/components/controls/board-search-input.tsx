import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { SearchIcon } from '../icons';

type BoardSearchInputProps = {
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
};

export function BoardSearchInput({
  className,
  inputClassName,
  iconClassName,
}: BoardSearchInputProps): ReactElement {
  return (
    <div
      className={joinClasses(
        'relative w-full shrink-0 sm:w-[256px]',
        className,
      )}
    >
      <label className="sr-only" htmlFor="project-task-search">
        Search tasks
      </label>
      <input
        className={joinClasses(
          'bg-primary-container-muted text-text-primary placeholder:text-text-placeholder focus-visible:outline-primary h-[39px] w-full rounded-sm border-0 pt-[9px] pr-4 pb-2.5 pl-10 text-[14px] leading-normal font-normal outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
          inputClassName,
        )}
        id="project-task-search"
        placeholder="Search tasks..."
        readOnly
        type="search"
      />
      <span
        className={joinClasses(
          'text-text-subtle pointer-events-none absolute top-0 bottom-0 left-[11.83px] flex items-center justify-center',
          iconClassName,
        )}
      >
        <SearchIcon />
      </span>
    </div>
  );
}
