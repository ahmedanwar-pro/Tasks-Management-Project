import type { ReactElement } from 'react';
import { PlusIcon } from '@/features/epics/screens/project-epics-list-screen/components/icons/project-epics-icons';

export function EpicDetailsTasksAddButton(): ReactElement {
  return (
    <button
      className="hidden items-center gap-1 rounded-xs px-3 py-1.5 text-body-sm font-semibold leading-base text-primary md:inline-flex"
      type="button"
    >
      <PlusIcon className="size-[10.5px]" />
      Add Task
    </button>
  );
}
