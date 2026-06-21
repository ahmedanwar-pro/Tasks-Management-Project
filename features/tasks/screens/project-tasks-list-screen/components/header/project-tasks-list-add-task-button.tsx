import Link from 'next/link';
import type { ReactElement } from 'react';
import {
  AddTaskIcon,
  CompactAddTaskIcon,
} from '../../../project-tasks-board-screen/components/icons';

type ProjectTasksListAddTaskButtonProps = {
  projectId: string;
};

export function ProjectTasksListAddTaskButton({
  projectId,
}: ProjectTasksListAddTaskButtonProps): ReactElement {
  return (
    <Link
      className="bg-primary-container text-text-inverse hover:bg-primary-container/90 focus-visible:outline-primary flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-sm px-4 text-[14px] leading-5 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:h-[39px] sm:w-auto sm:text-[13px] sm:font-semibold"
      href={`/projects/${projectId}/tasks/new`}
    >
      <CompactAddTaskIcon className="size-[8.17px] sm:hidden" />
      <AddTaskIcon className="hidden size-[15px] sm:block" />
      <span className="sm:hidden">Create Task</span>
      <span className="hidden sm:inline">Add Task</span>
    </Link>
  );
}
