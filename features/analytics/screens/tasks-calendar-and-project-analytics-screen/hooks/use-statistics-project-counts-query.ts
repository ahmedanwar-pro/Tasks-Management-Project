'use client';

import { useQuery } from '@tanstack/react-query';
import { getTasksCountPerProject } from '../api';
import type { StatisticsFilters } from '../types';
import { getStatisticsProjectCountsQueryKey } from './statistics-query-keys';
import { shouldRetryStatisticsQuery } from './statistics-query-retry';

export function useStatisticsProjectCountsQuery(
  filters: Pick<StatisticsFilters, 'endDate' | 'startDate' | 'status'>,
) {
  return useQuery({
    queryFn: () => getTasksCountPerProject(filters),
    queryKey: getStatisticsProjectCountsQueryKey(filters),
    retry: shouldRetryStatisticsQuery,
  });
}
