import type { ReactElement } from 'react';
import type { EpicDetailsTask } from '../../types';
import {
  EpicDetailsTaskCard,
  EpicDetailsTaskRow,
} from './epic-details-task-card';
import { EpicDetailsTasksMobileAddLink } from './epic-details-tasks-mobile-add-link';

type EpicDetailsTasksListProps = {
  epicId: string;
  projectId: string;
  tasks: EpicDetailsTask[];
};

export function EpicDetailsTasksList({
  epicId,
  projectId,
  tasks,
}: EpicDetailsTasksListProps): ReactElement {
  return (
    <>
      <div className="flex w-full flex-col gap-3 lg:hidden">
        {tasks.map((task) => (
          <EpicDetailsTaskCard key={task.id} task={task} />
        ))}
        <EpicDetailsTasksMobileAddLink epicId={epicId} projectId={projectId} />
      </div>
      <ul className="border-border-subtle bg-surface hidden w-full overflow-hidden rounded-md border lg:block">
        {tasks.map((task) => (
          <EpicDetailsTaskRow key={task.id} task={task} />
        ))}
      </ul>
    </>
  );
}
