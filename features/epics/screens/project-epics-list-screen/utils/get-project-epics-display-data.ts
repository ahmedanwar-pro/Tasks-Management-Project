import type {
  GetProjectEpicsResponse,
  ProjectEpicResponse,
} from '../api';

type ProjectEpicsDisplayData = {
  displayedEpicResponses: ProjectEpicResponse[];
  hasMoreMobileEpics: boolean;
};

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
  const displayedEpicResponses = isMobileViewport
    ? [...firstPageEpics, ...additionalMobileEpics]
    : firstPageEpics;
  const hasMoreMobileEpics =
    isMobileViewport &&
    epicsData !== undefined &&
    displayedEpicResponses.length < epicsData.totalCount;

  return {
    displayedEpicResponses,
    hasMoreMobileEpics,
  };
}
