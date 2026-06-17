import { useRouter } from 'next/navigation';
import type { ChangeEvent, ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { BoardIcon, ChevronDownIcon } from '../icons';

type ViewSwitcherProps = {
  projectId: string;
};

export function ViewSwitcher({ projectId }: ViewSwitcherProps): ReactElement {
  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    router.push(`/projects/${projectId}/tasks?view=${event.target.value}`);
  }

  return (
    <div className="border-border bg-surface relative flex h-[39px] min-w-[156px] shrink-0 items-center rounded-sm border px-[17px] shadow-sm">
      <BoardIcon className="text-text-primary mr-2 size-[13.5px]" />
      <label className="sr-only" htmlFor="project-task-view">
        Task view
      </label>
      <select
        className={joinClasses(
          'text-text-primary h-full min-w-0 flex-1 appearance-none bg-transparent pr-6 text-center text-[14px] leading-[20px] font-medium outline-none',
        )}
        defaultValue="board"
        id="project-task-view"
        onChange={handleChange}
      >
        <option value="list">List View</option>
        <option value="board">Board View</option>
      </select>
      <ChevronDownIcon className="text-text-primary pointer-events-none absolute right-[17px] size-[9px]" />
    </div>
  );
}
