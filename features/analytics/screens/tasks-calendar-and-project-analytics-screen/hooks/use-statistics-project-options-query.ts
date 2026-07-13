'use client';

import { useQuery } from '@tanstack/react-query';
import { getStatisticsProjectOptions } from '../utils';
import { statisticsProjectOptionsQueryKey } from './statistics-query-keys';
import { shouldRetryStatisticsQuery } from './statistics-query-retry';

export function useStatisticsProjectOptionsQuery() {
  return useQuery({
    queryFn: () => getStatisticsProjectOptions(),
    queryKey: statisticsProjectOptionsQueryKey,
    retry: shouldRetryStatisticsQuery,
  });
}
