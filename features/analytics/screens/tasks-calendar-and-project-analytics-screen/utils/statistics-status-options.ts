import type { TaskStatus } from '@/features/tasks/screens/add-new-task-screen/add-new-task-form-schema';
import { projectTasksBoardStatuses } from '@/features/tasks/screens/project-tasks-board-screen/utils';

export type StatisticsStatusOption = {
  label: string;
  value: TaskStatus | null;
};

export const allStatusesStatisticsOption: StatisticsStatusOption = {
  label: 'All Statuses',
  value: null,
};

export const statisticsStatusOptions: StatisticsStatusOption[] = [
  allStatusesStatisticsOption,
  ...projectTasksBoardStatuses.map(({ statisticsLabel, status }) => ({
    label: statisticsLabel,
    value: status,
  })),
];
