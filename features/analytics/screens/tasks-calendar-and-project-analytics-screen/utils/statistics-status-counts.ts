import { taskStatusValues } from '@/features/tasks/screens/add-new-task-screen/add-new-task-form-schema';
import type { StatisticsStatusCounts } from '../types';

export function createEmptyStatisticsStatusCounts(): StatisticsStatusCounts {
  return taskStatusValues.reduce<StatisticsStatusCounts>((counts, status) => {
    counts[status] = 0;
    return counts;
  }, {} as StatisticsStatusCounts);
}
