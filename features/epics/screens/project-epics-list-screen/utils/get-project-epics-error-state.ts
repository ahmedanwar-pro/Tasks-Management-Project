import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api';

type ProjectEpicsErrorState = {
  isError: boolean;
  isUnauthorized: boolean;
  visibleError: unknown;
};

export function getProjectEpicsErrorState({
  epicsError,
  isMobileViewport,
  moreEpicsError,
}: {
  epicsError: unknown;
  isMobileViewport: boolean;
  moreEpicsError: unknown;
}): ProjectEpicsErrorState {
  const visibleError =
    epicsError ?? (isMobileViewport ? moreEpicsError : undefined);
  const isUnauthorized =
    isProjectUnauthorizedError(epicsError) ||
    isProjectUnauthorizedError(moreEpicsError);
  const isError = Boolean(visibleError) && !isUnauthorized;

  return {
    isError,
    isUnauthorized,
    visibleError,
  };
}
