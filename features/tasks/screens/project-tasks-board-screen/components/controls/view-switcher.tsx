import { useRouter } from 'next/navigation';
import type { ChangeEvent, ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { BoardIcon, ChevronDownIcon, ListIcon } from '../icons';

type TaskView = 'board' | 'list';

type ViewSwitcherProps = {
  className?: string;
  currentView?: TaskView;
  projectId: string;
  selectClassName?: string;
};

export function ViewSwitcher({
  className,
  currentView = 'board',
  projectId,
  selectClassName,
}: ViewSwitcherProps): ReactElement {
  const router = useRouter();
  const ViewIcon = currentView === 'list' ? ListIcon : BoardIcon;

  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    router.push(`/projects/${projectId}/tasks?view=${event.target.value}`);
  }

  return (
    <div
      className={joinClasses(
        'border-border bg-surface relative flex h-[39px] min-w-[156px] shrink-0 items-center rounded-sm border px-[17px] shadow-sm',
        className,
      )}
    >
      <ViewIcon className="text-primary mr-2" />
      <label className="sr-only" htmlFor="project-task-view">
        Task view
      </label>
      <select
        className={joinClasses(
          'text-text-primary h-full min-w-0 flex-1 appearance-none bg-transparent pr-6 text-center text-[14px] leading-[20px] font-medium outline-none',
          selectClassName,
        )}
        id="project-task-view"
        onChange={handleChange}
        value={currentView}
      >
        <option value="list">List View</option>
        <option value="board">Board View</option>
      </select>
      <ChevronDownIcon className="text-text-primary pointer-events-none absolute right-[17px]" />
    </div>
  );
}
