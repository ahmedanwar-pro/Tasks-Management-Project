import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api';

type ProjectTasksListErrorState = {
  hasPartialError: boolean;
  isError: boolean;
  isUnauthorized: boolean;
  visibleError: unknown;
};

export function getProjectTasksListErrorState({
  hasMobileTasks,
  isMobileViewport,
  moreTasksError,
  tasksError,
}: {
  hasMobileTasks: boolean;
  isMobileViewport: boolean;
  moreTasksError: unknown;
  tasksError: unknown;
}): ProjectTasksListErrorState {
  const visibleError = isMobileViewport ? moreTasksError : tasksError;
  const isUnauthorized = isProjectUnauthorizedError(visibleError);

  return {
    hasPartialError:
      isMobileViewport &&
      hasMobileTasks &&
      Boolean(visibleError) &&
      !isUnauthorized,
    isError:
      Boolean(visibleError) &&
      !(isMobileViewport && hasMobileTasks) &&
      !isUnauthorized,
    isUnauthorized,
    visibleError,
  };
}
