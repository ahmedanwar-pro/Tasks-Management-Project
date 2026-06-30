import type { GetProjectEpicsResponse } from '../api';
import type { ProjectEpicResponse } from '../../shared/types';

type ProjectEpicsDisplayData = {
  displayedEpicResponses: ProjectEpicResponse[];
  hasMoreMobileEpics: boolean;
};

function getUniqueEpicResponses(
  epicResponses: ProjectEpicResponse[],
): ProjectEpicResponse[] {
  const seenEpicIds = new Set<string>();

  return epicResponses.filter((epic) => {
    if (seenEpicIds.has(epic.id)) {
      return false;
    }

    seenEpicIds.add(epic.id);
    return true;
  });
}

export function getProjectEpicsDisplayData({
  epicsData,
  isMobileViewport,
  moreEpicsData,
}: {
  epicsData?: GetProjectEpicsResponse;
  isMobileViewport: boolean;
  moreEpicsData?: { pages: GetProjectEpicsResponse[] };
}): ProjectEpicsDisplayData {
  const firstPageEpics = epicsData?.epics ?? [];
  const additionalMobileEpics =
    moreEpicsData?.pages.flatMap((page) => page.epics) ?? [];
  const loadedEpicResponses = isMobileViewport
    ? [...firstPageEpics, ...additionalMobileEpics]
    : firstPageEpics;
  const displayedEpicResponses = getUniqueEpicResponses(loadedEpicResponses);
  const hasMoreMobileEpics =
    isMobileViewport &&
    epicsData !== undefined &&
    loadedEpicResponses.length < epicsData.totalCount;

  return {
    displayedEpicResponses,
    hasMoreMobileEpics,
  };
}
