import type { ProjectTaskResponse } from '../../project-tasks-board-screen/api';
import type { GetProjectTasksResponse } from '../api';

type ProjectTasksListDisplayData = {
  displayedTaskResponses: ProjectTaskResponse[];
  hasMoreMobileTasks: boolean;
  totalCount: number;
};

function getUniqueTasks(tasks: ProjectTaskResponse[]): ProjectTaskResponse[] {
  return Array.from(new Map(tasks.map((task) => [task.id, task])).values());
}

export function getProjectTasksListDisplayData({
  isMobileViewport,
  moreTasksData,
  tasksData,
}: {
  isMobileViewport: boolean;
  moreTasksData?: { pages: GetProjectTasksResponse[] };
  tasksData?: GetProjectTasksResponse;
}): ProjectTasksListDisplayData {
  const mobileTasks = moreTasksData?.pages.flatMap((page) => page.tasks) ?? [];
  const uniqueMobileTasks = getUniqueTasks(mobileTasks);
  const displayedTaskResponses = isMobileViewport
    ? uniqueMobileTasks
    : (tasksData?.tasks ?? []);
  const totalCount = isMobileViewport
    ? (moreTasksData?.pages[0]?.totalCount ?? 0)
    : (tasksData?.totalCount ?? 0);
  const hasMoreMobileTasks =
    isMobileViewport &&
    moreTasksData !== undefined &&
    displayedTaskResponses.length < totalCount;

  return {
    displayedTaskResponses,
    hasMoreMobileTasks,
    totalCount,
  };
}
