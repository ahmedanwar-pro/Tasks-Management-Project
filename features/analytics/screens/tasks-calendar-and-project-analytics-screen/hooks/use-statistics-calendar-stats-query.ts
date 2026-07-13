'use client';

import { useQuery } from '@tanstack/react-query';
import { getTasksCalendarStats } from '../api';
import type { StatisticsFilters } from '../types';
import { getStatisticsCalendarStatsQueryKey } from './statistics-query-keys';
import { shouldRetryStatisticsQuery } from './statistics-query-retry';

export function useStatisticsCalendarStatsQuery(filters: StatisticsFilters) {
  return useQuery({
    queryFn: () => getTasksCalendarStats(filters),
    queryKey: getStatisticsCalendarStatsQueryKey(filters),
    retry: shouldRetryStatisticsQuery,
  });
}
