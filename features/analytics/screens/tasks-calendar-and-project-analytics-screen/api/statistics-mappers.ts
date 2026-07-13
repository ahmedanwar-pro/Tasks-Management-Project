import { taskStatusValues } from '@/features/tasks/screens/add-new-task-screen/add-new-task-form-schema';
import type {
  StatisticsCalendarKpiData,
  StatisticsDailySummary,
  StatisticsProjectCount,
  StatisticsProjectCountResponse,
  StatisticsStatusCounts,
  TasksCalendarStatsResponse,
} from '../types';
import { createEmptyStatisticsStatusCounts } from '../utils/statistics-status-counts';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getCount(value: unknown): number {
  const count = typeof value === 'number' ? value : Number(value);

  return Number.isFinite(count) ? count : 0;
}

export function mapStatisticsStatusCounts(
  response: unknown,
): StatisticsStatusCounts {
  const counts = createEmptyStatisticsStatusCounts();

  if (!isRecord(response)) {
    return counts;
  }

  taskStatusValues.forEach((status) => {
    counts[status] = getCount(response[status]);
  });

  return counts;
}

function mapDailySummary(response: unknown): StatisticsDailySummary | null {
  if (!isRecord(response) || typeof response.day !== 'string') {
    return null;
  }

  return {
    day: response.day,
    statuses: mapStatisticsStatusCounts(response.statuses),
  };
}

export function mapTasksCalendarStatsResponse(
  response: TasksCalendarStatsResponse | null,
): StatisticsCalendarKpiData {
  const daily = Array.isArray(response?.daily)
    ? response.daily
        .map(mapDailySummary)
        .filter((day): day is StatisticsDailySummary => day !== null)
    : [];

  return {
    daily,
    doneTasks: getCount(response?.done_tasks),
    overdueTasks: getCount(response?.overdue_tasks),
    statusTotals: mapStatisticsStatusCounts(response?.totals),
    totalTasks: getCount(response?.total_tasks),
  };
}

export function mapProjectCountResponse(
  response: StatisticsProjectCountResponse | null,
): StatisticsProjectCount[] {
  if (!Array.isArray(response)) {
    return [];
  }

  return response.reduce<StatisticsProjectCount[]>((projects, project) => {
    if (
      !isRecord(project) ||
      typeof project.project_id !== 'string' ||
      typeof project.project_name !== 'string'
    ) {
      return projects;
    }

    projects.push({
      projectId: project.project_id,
      projectName: project.project_name,
      tasksCount: getCount(project.tasks_count),
    });

    return projects;
  }, []);
}
