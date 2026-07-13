'use client';

import { isProjectsUnauthorizedError } from '@/features/projects/screens/projects-list-screen/api/get-projects';
import { isStatisticsUnauthorizedError } from '../api';
import type { StatisticsScreenData } from '../types';
import { allProjectsStatisticsOption } from '../utils';
import { useStatisticsCalendarStatsQuery } from './use-statistics-calendar-stats-query';
import { useStatisticsFilters } from './use-statistics-filters';
import { useStatisticsProjectCountsQuery } from './use-statistics-project-counts-query';
import { useStatisticsProjectOptionsQuery } from './use-statistics-project-options-query';
import { useStatisticsAuthRedirect } from './use-statistics-auth-redirect';
import { toStatisticsSectionState } from './statistics-section-state';

export function useStatisticsScreenData(): StatisticsScreenData {
  const filters = useStatisticsFilters();
  const calendarStatsQuery = useStatisticsCalendarStatsQuery(
    filters.appliedFilters,
  );
  const projectCountsQuery = useStatisticsProjectCountsQuery({
    endDate: filters.appliedFilters.endDate,
    startDate: filters.appliedFilters.startDate,
    status: filters.appliedFilters.status,
  });
  const projectOptionsQuery = useStatisticsProjectOptionsQuery();
  const isUnauthorized =
    isStatisticsUnauthorizedError(calendarStatsQuery.error) ||
    isStatisticsUnauthorizedError(projectCountsQuery.error) ||
    isStatisticsUnauthorizedError(projectOptionsQuery.error) ||
    isProjectsUnauthorizedError(projectOptionsQuery.error);

  useStatisticsAuthRedirect(isUnauthorized);

  return {
    calendarStats: toStatisticsSectionState(calendarStatsQuery),
    filters,
    projectCounts: toStatisticsSectionState(projectCountsQuery),
    projectOptions: {
      error: projectOptionsQuery.error,
      isFetching: projectOptionsQuery.isFetching,
      isPending: projectOptionsQuery.isPending,
      onRetry: () => {
        void projectOptionsQuery.refetch();
      },
      options: projectOptionsQuery.data ?? [allProjectsStatisticsOption],
    },
  };
}
