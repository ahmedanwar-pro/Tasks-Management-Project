import type { ReactElement } from 'react';
import { SearchIcon } from '../icons';

export function BoardSearchInput(): ReactElement {
  return (
    <div className="relative w-full shrink-0 sm:w-[256px]">
      <label className="sr-only" htmlFor="project-task-search">
        Search tasks
      </label>
      <input
        className="bg-primary-container-muted text-text-primary placeholder:text-text-placeholder focus-visible:outline-primary h-[39px] w-full rounded-sm border-0 pt-[9px] pr-4 pb-2.5 pl-10 text-[14px] leading-normal font-normal outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
        id="project-task-search"
        placeholder="Search tasks..."
        readOnly
        type="search"
      />
      <span className="text-text-subtle pointer-events-none absolute top-0 bottom-0 left-[11.83px] flex items-center justify-center">
        <SearchIcon />
      </span>
    </div>
  );
}
