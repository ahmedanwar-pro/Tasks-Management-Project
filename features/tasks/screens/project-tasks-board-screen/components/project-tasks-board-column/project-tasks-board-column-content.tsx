import type { ReactElement } from 'react';
import type { TaskStatus } from '../../../add-new-task-screen/add-new-task-form-schema';
import type { ProjectTasksBoardTask } from '../../types';
import { AddTaskButton } from '../controls';
import {
  ProjectTasksBoardEmptyState,
  ProjectTasksBoardError,
  ProjectTasksBoardLoading,
} from '../states';
import { ProjectTasksBoardTaskList } from './project-tasks-board-task-list';

type ProjectTasksBoardColumnContentProps = {
  error: Error | null;
  isPending: boolean;
  onRetry: () => void;
  projectId: string;
  status: TaskStatus;
  tasks: ProjectTasksBoardTask[];
};

export function ProjectTasksBoardColumnContent({
  error,
  isPending,
  onRetry,
  projectId,
  status,
  tasks,
}: ProjectTasksBoardColumnContentProps): ReactElement {
  return (
    <div className="flex flex-col gap-3">
      {isPending ? <ProjectTasksBoardLoading /> : null}
      {!isPending && error ? (
        <ProjectTasksBoardError onRetry={onRetry} />
      ) : null}
      {!isPending && !error && tasks.length === 0 ? (
        <>
          <AddTaskButton projectId={projectId} status={status} />
          <ProjectTasksBoardEmptyState />
        </>
      ) : null}
      {!isPending && !error && tasks.length > 0 ? (
        <>
          <AddTaskButton projectId={projectId} status={status} />
          <ProjectTasksBoardTaskList tasks={tasks} />
        </>
      ) : null}
    </div>
  );
}
