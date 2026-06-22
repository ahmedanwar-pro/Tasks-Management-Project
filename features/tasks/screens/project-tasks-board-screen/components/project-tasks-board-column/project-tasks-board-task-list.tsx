import type { ReactElement } from 'react';
import type { ProjectTasksBoardTask } from '../../types';
import { TaskCard } from '../task-card';

type ProjectTasksBoardTaskListProps = {
  projectId: string;
  tasks: ProjectTasksBoardTask[];
};

export function ProjectTasksBoardTaskList({
  projectId,
  tasks,
}: ProjectTasksBoardTaskListProps): ReactElement {
  return (
    <ul className="flex min-w-0 flex-col gap-3">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard projectId={projectId} task={task} />
        </li>
      ))}
    </ul>
  );
}
