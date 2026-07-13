import { projectTasksBoardStatuses } from '@/features/tasks/screens/project-tasks-board-screen/utils';
import type {
  StatisticsCalendarKpiData,
  StatisticsStatusCounts,
} from '../types';
import { createEmptyStatisticsStatusCounts } from '../utils/statistics-status-counts';

export const emptyStatusCounts = createEmptyStatisticsStatusCounts();

export const emptyCalendarStats: StatisticsCalendarKpiData = {
  daily: [],
  doneTasks: 0,
  overdueTasks: 0,
  statusTotals: emptyStatusCounts,
  totalTasks: 0,
};

export function formatCount(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function getPositiveStatusEntries(counts: StatisticsStatusCounts) {
  return projectTasksBoardStatuses
    .map((config) => ({
      config,
      count: counts[config.status] ?? 0,
    }))
    .filter(({ count }) => count > 0);
}
