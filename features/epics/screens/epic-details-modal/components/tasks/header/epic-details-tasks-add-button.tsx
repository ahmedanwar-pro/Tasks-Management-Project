import type { ReactElement } from 'react';
import Link from 'next/link';
import { PlusIcon } from '../../../../shared/icons';

type EpicDetailsTasksAddButtonProps = {
  epicId: string;
  projectId: string;
};

export function EpicDetailsTasksAddButton({
  epicId,
  projectId,
}: EpicDetailsTasksAddButtonProps): ReactElement {
  return (
    <Link
      className="text-body-sm leading-base text-primary hidden items-center gap-1 rounded-xs px-3 py-1.5 font-semibold md:inline-flex"
      href={`/projects/${projectId}/tasks/new?epicId=${epicId}`}
    >
      <PlusIcon className="size-[10.5px]" />
      Add Task
    </Link>
  );
}
