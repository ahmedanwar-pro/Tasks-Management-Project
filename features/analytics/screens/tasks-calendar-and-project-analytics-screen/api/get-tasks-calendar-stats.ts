import { supabase } from '@/lib/supabase';
import type {
  StatisticsCalendarKpiData,
  StatisticsFilters,
  TasksCalendarStatsRequest,
  TasksCalendarStatsResponse,
} from '../types';
import { mapTasksCalendarStatsResponse } from './statistics-mappers';
import { requireStatisticsSession } from './require-statistics-session';
import {
  isStatisticsUnauthorizedResponse,
  StatisticsUnauthorizedError,
} from './statistics-api-errors';

const getTasksCalendarStatsRpcName = 'get_tasks_calendar_stats';

function getTasksCalendarStatsRequest(
  filters: StatisticsFilters,
): TasksCalendarStatsRequest {
  return {
    p_end_date: filters.endDate,
    p_project_id: filters.projectId,
    p_start_date: filters.startDate,
    p_status: filters.status,
  };
}

export async function getTasksCalendarStats(
  filters: StatisticsFilters,
): Promise<StatisticsCalendarKpiData> {
  await requireStatisticsSession();

  const { data, error } = await supabase.rpc(
    getTasksCalendarStatsRpcName,
    getTasksCalendarStatsRequest(filters),
  );

  if (error) {
    if (isStatisticsUnauthorizedResponse(error)) {
      throw new StatisticsUnauthorizedError();
    }

    throw error;
  }

  return mapTasksCalendarStatsResponse(data as TasksCalendarStatsResponse);
}
