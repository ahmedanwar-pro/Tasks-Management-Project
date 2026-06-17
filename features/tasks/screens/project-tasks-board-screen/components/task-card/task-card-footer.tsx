import type { ReactElement } from 'react';
import type { ProjectTasksBoardAssignee } from '../../types';
import { TaskCardAssignee } from './task-card-assignee';
import { TaskCardMeta } from './task-card-meta';

type TaskCardFooterProps = {
  assignee: ProjectTasksBoardAssignee | null;
  dueDateTime: string;
  isActiveProgressTask: boolean;
  isDelayed: boolean;
  isDone: boolean;
  isReadyForProductionTask: boolean;
  metaLabel: string;
};

export function TaskCardFooter({
  assignee,
  dueDateTime,
  isActiveProgressTask,
  isDelayed,
  isDone,
  isReadyForProductionTask,
  metaLabel,
}: TaskCardFooterProps): ReactElement {
  return (
    <div className="mt-auto flex min-w-0 items-center justify-between gap-3">
      <TaskCardMeta
        dueDateTime={dueDateTime}
        isActiveProgressTask={isActiveProgressTask}
        isDelayed={isDelayed}
        isDone={isDone}
        isReadyForProductionTask={isReadyForProductionTask}
        label={metaLabel}
      />
      <TaskCardAssignee
        assignee={assignee}
        isActiveProgressTask={isActiveProgressTask}
        isReadyForProductionTask={isReadyForProductionTask}
      />
    </div>
  );
}
