import type { ReactElement } from 'react';
import type { ProjectTasksBoardTask } from '../../types';
import { DraggableTaskCard } from '../task-card';

type ProjectTasksBoardTaskListProps = {
  isDragDisabled: boolean;
  pendingTaskId: string | null;
  projectId: string;
  tasks: ProjectTasksBoardTask[];
};

export function ProjectTasksBoardTaskList({
  isDragDisabled,
  pendingTaskId,
  projectId,
  tasks,
}: ProjectTasksBoardTaskListProps): ReactElement {
  return (
    <ul className="flex min-w-0 flex-col gap-3">
      {tasks.map((task) => (
        <DraggableTaskCard
          disabled={isDragDisabled}
          isPending={pendingTaskId === task.id}
          key={task.id}
          projectId={projectId}
          task={task}
        />
      ))}
    </ul>
  );
}
