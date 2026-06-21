import Link from 'next/link';
import type { ReactElement } from 'react';
import { ListIcon } from '@/features/epics/screens/epic-details-modal/components/icons/epic-details-modal-icons';
import {
  AddTaskIcon,
  CompactAddTaskIcon,
} from '../../../project-tasks-board-screen/components/icons';

type ProjectTasksListEmptyProps = {
  projectId: string;
};

export function ProjectTasksListEmpty({
  projectId,
}: ProjectTasksListEmptyProps): ReactElement {
  return (
    <section className="border-border-strong bg-surface-low/30 mt-6 flex min-h-[216px] w-full shrink-0 flex-col items-center justify-center gap-3 rounded-md border border-dashed px-6 py-8 text-center md:mt-8 md:min-h-[260px] md:gap-4 md:px-8 md:py-10 lg:min-h-[304px] lg:gap-5">
      <div className="bg-primary-container-muted text-text-primary/30 flex size-10 items-center justify-center rounded-lg md:size-12">
        <ListIcon />
      </div>
      <p className="text-text-subtle text-center text-[11px] leading-[16.5px] font-bold tracking-[1.1px] uppercase">
        No Items
      </p>
      <div className="flex max-w-full flex-col items-center gap-2">
        <h2 className="text-text-primary text-[18px] leading-[24px] font-medium md:text-[20px] md:leading-[28px]">
          No tasks yet
        </h2>
        <p className="text-text-secondary max-w-[448px] text-[14px] leading-[22px] md:text-[16px] md:leading-[26px]">
          Create a task to start filling this project list.
        </p>
      </div>
      <div className="pt-1 md:pt-2">
        <Link
          className="bg-primary-container text-text-inverse hover:bg-primary-container/90 focus-visible:outline-primary inline-flex h-9 items-center justify-center gap-2 rounded-sm px-5 text-[13px] leading-5 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:h-10 md:px-7 md:text-[14px] lg:h-11 lg:px-8"
          href={`/projects/${projectId}/tasks/new`}
        >
          <CompactAddTaskIcon className="size-[10px] sm:hidden" />
          <AddTaskIcon className="hidden size-[14px] sm:block md:size-[15px]" />
          Add task
        </Link>
      </div>
    </section>
  );
}
