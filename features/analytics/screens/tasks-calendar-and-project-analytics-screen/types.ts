import type { TaskStatus } from '@/features/tasks/screens/add-new-task-screen/add-new-task-form-schema';
import type { StatisticsDateRange, StatisticsProjectOption } from './utils';

export type StatisticsStatusCounts = Record<TaskStatus, number>;

export type StatisticsFilters = StatisticsDateRange & {
  projectId: string | null;
  status: TaskStatus | null;
};

export type StatisticsFilterController = {
  appliedFilters: StatisticsFilters;
  closeDatePanel: () => void;
  datePanelOpen: boolean;
  dateRangeError: string | null;
  draftDateRange: StatisticsDateRange;
  openDatePanel: () => void;
  setDraftDateRange: (range: StatisticsDateRange) => void;
  setProjectId: (projectId: string | null) => void;
  setStatus: (status: TaskStatus | null) => void;
  shiftAppliedDateRange: (days: number) => void;
  applyDraftDateRange: () => void;
};

export type TasksCalendarStatsRequest = {
  p_end_date: string;
  p_project_id: string | null;
  p_start_date: string;
  p_status: TaskStatus | null;
};

export type TasksCalendarStatsResponse = {
  daily?: unknown[] | null;
  done_tasks?: number | string | null;
  overdue_tasks?: number | string | null;
  total_tasks?: number | string | null;
  totals?: Partial<Record<TaskStatus, number | string | null>> | null;
} | null;

export type StatisticsProjectCountRequest = {
  p_end_date: string;
  p_start_date: string;
  p_status: TaskStatus | null;
};

export type StatisticsProjectCountResponse = Array<{
  project_id?: string | null;
  project_name?: string | null;
  tasks_count?: number | string | null;
}> | null;

export type StatisticsDailySummary = {
  day: string;
  statuses: StatisticsStatusCounts;
};

export type StatisticsCalendarKpiData = {
  daily: StatisticsDailySummary[];
  doneTasks: number;
  overdueTasks: number;
  statusTotals: StatisticsStatusCounts;
  totalTasks: number;
};

export type StatisticsProjectCount = {
  projectId: string;
  projectName: string;
  tasksCount: number;
};

export type StatisticsSectionState<TData> = {
  data: TData | null;
  error: Error | null;
  isFetching: boolean;
  isPending: boolean;
  showSkeleton: boolean;
  onRetry: () => void;
};

export type StatisticsProjectOptionsState = {
  error: Error | null;
  isFetching: boolean;
  isPending: boolean;
  onRetry: () => void;
  options: StatisticsProjectOption[];
};

export type StatisticsScreenData = {
  calendarStats: StatisticsSectionState<StatisticsCalendarKpiData>;
  filters: StatisticsFilterController;
  projectCounts: StatisticsSectionState<StatisticsProjectCount[]>;
  projectOptions: StatisticsProjectOptionsState;
};
