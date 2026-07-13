import type { StatisticsFilters } from '../types';

export const statisticsProjectOptionsQueryKey = [
  'my-statistics',
  'project-options',
] as const;

export function getStatisticsCalendarStatsQueryKey(filters: StatisticsFilters) {
  return [
    'my-statistics',
    'calendar-kpi',
    filters.startDate,
    filters.endDate,
    filters.projectId,
    filters.status,
  ] as const;
}

export function getStatisticsProjectCountsQueryKey(
  filters: Pick<StatisticsFilters, 'endDate' | 'startDate' | 'status'>,
) {
  return [
    'my-statistics',
    'project-counts',
    filters.startDate,
    filters.endDate,
    filters.status,
  ] as const;
}
