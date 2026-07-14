import { useEffect, useState, type ReactElement } from 'react';
import { useProjectMembersQuery } from '@/features/members/screens/project-members-list-screen/hooks';
import { useEpicTasksQuery } from '../../hooks';
import {
  getEpicDetailsTaskSuccessMessage,
  type EpicDetailsTaskSuccessType,
} from '../../utils/epic-details-task-navigation';
import { mapEpicTask } from '../../utils/epic-task-display-data';
import { EpicDetailsTasksEmptyState } from './epic-details-tasks-empty-state';
import { EpicDetailsTasksError } from './epic-details-tasks-error';
import { EpicDetailsTasksList } from './epic-details-tasks-list';
import { EpicDetailsTasksLoading } from './epic-details-tasks-loading';
import { EpicDetailsTasksHeader } from './header/epic-details-tasks-header';
import { EpicDetailsTasksSuccessToast } from './epic-details-tasks-success-toast';

const epicDetailsTasksSuccessToastDurationMs = 4000;

type EpicDetailsTasksSectionProps = {
  currentPage: number;
  epicId: string;
  projectId: string;
  successType?: EpicDetailsTaskSuccessType;
};

export function EpicDetailsTasksSection({
  currentPage,
  epicId,
  projectId,
  successType,
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
  const [successMessage] = useState(() =>
    successType ? getEpicDetailsTaskSuccessMessage(successType) : undefined,
  );
  const [isSuccessToastVisible, setIsSuccessToastVisible] = useState(
    Boolean(successType),
  );

  useEffect(() => {
    if (!isSuccessToastVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsSuccessToastVisible(false);
    }, epicDetailsTasksSuccessToastDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSuccessToastVisible]);

  return (
    <section className="flex w-full flex-col">
      <EpicDetailsTasksHeader
        currentPage={currentPage}
        epicId={epicId}
        isLoading={isPending}
        projectId={projectId}
        taskCount={taskCount}
      />
      <div className="mt-4 md:mt-6">
        {successMessage ? (
          <EpicDetailsTasksSuccessToast
            message={successMessage}
            onClose={() => setIsSuccessToastVisible(false)}
            visible={isSuccessToastVisible}
          />
        ) : null}
        <div className="flex w-full flex-col gap-4 md:gap-6">
          {isPending ? <EpicDetailsTasksLoading /> : null}
          {error ? (
            <EpicDetailsTasksError
              onRetry={() => {
                void refetch();
              }}
            />
          ) : null}
          {!isPending && !error && tasks.length === 0 ? (
            <EpicDetailsTasksEmptyState
              currentPage={currentPage}
              epicId={epicId}
              projectId={projectId}
            />
          ) : null}
          {!isPending && !error && tasks.length > 0 ? (
            <EpicDetailsTasksList
              currentPage={currentPage}
              epicId={epicId}
              projectId={projectId}
              tasks={tasks}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
