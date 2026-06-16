import type { ReactElement } from 'react';
import { useProjectMembersQuery } from '@/features/members/screens/project-members-list-screen/hooks';
import { useEpicTasksQuery } from '../../hooks';
import { mapEpicTask } from '../../utils/epic-task-display-data';
import { EpicDetailsTasksEmptyState } from './epic-details-tasks-empty-state';
import { EpicDetailsTasksError } from './epic-details-tasks-error';
import { EpicDetailsTasksList } from './epic-details-tasks-list';
import { EpicDetailsTasksLoading } from './epic-details-tasks-loading';
import { EpicDetailsTasksHeader } from './header/epic-details-tasks-header';

type EpicDetailsTasksSectionProps = {
  epicId: string;
  projectId: string;
};

export function EpicDetailsTasksSection({
  epicId,
  projectId,
}: EpicDetailsTasksSectionProps): ReactElement {
  const {
    data: taskResponse = [],
    error,
    isPending,
    refetch,
  } = useEpicTasksQuery(projectId, epicId);
  const { data: membersResponse } = useProjectMembersQuery(
    projectId,
    taskResponse.length > 0,
  );
  const tasks = taskResponse.map((task) =>
    mapEpicTask(task, membersResponse?.members ?? []),
  );
  const taskCount = isPending || error ? 0 : tasks.length;

  return (
    <section className="flex w-full flex-col gap-4 md:gap-6">
      <EpicDetailsTasksHeader
        epicId={epicId}
        isLoading={isPending}
        projectId={projectId}
        taskCount={taskCount}
      />
      {isPending ? <EpicDetailsTasksLoading /> : null}
      {error ? (
        <EpicDetailsTasksError
          onRetry={() => {
            void refetch();
          }}
        />
      ) : null}
      {!isPending && !error && tasks.length === 0 ? (
        <EpicDetailsTasksEmptyState epicId={epicId} projectId={projectId} />
      ) : null}
      {!isPending && !error && tasks.length > 0 ? (
        <EpicDetailsTasksList
          epicId={epicId}
          projectId={projectId}
          tasks={tasks}
        />
      ) : null}
    </section>
  );
}
