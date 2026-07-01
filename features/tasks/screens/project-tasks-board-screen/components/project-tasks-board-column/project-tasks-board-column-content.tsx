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
  hasBoardError: boolean;
  isBoardEmpty: boolean;
  isDragDisabled: boolean;
  isPending: boolean;
  isSearchActive: boolean;
  onRetry: () => void;
  pendingTaskId: string | null;
  projectId: string;
  status: TaskStatus;
  tasks: ProjectTasksBoardTask[];
};

export function ProjectTasksBoardColumnContent({
  error,
  hasBoardError,
  isBoardEmpty,
  isDragDisabled,
  isPending,
  isSearchActive,
  onRetry,
  pendingTaskId,
  projectId,
  status,
  tasks,
}: ProjectTasksBoardColumnContentProps): ReactElement {
  if (hasBoardError) {
    return (
      <div className="flex flex-col gap-3">
        <AddTaskButton projectId={projectId} status={status} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {isPending ? <ProjectTasksBoardLoading /> : null}
      {!isPending && error ? (
        <ProjectTasksBoardError
          message={isSearchActive ? 'Failed to search tasks' : undefined}
          onRetry={onRetry}
        />
      ) : null}
      {!isPending && !error && tasks.length === 0 ? (
        <>
          <AddTaskButton projectId={projectId} status={status} />
          {!isBoardEmpty ? <ProjectTasksBoardEmptyState /> : null}
        </>
      ) : null}
      {!isPending && !error && tasks.length > 0 ? (
        <>
          <AddTaskButton projectId={projectId} status={status} />
          <ProjectTasksBoardTaskList
            isDragDisabled={isDragDisabled}
            pendingTaskId={pendingTaskId}
            projectId={projectId}
            tasks={tasks}
          />
        </>
      ) : null}
    </div>
  );
}
