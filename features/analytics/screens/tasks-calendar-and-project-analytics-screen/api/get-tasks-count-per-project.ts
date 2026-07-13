import { supabase } from '@/lib/supabase';
import type {
  StatisticsFilters,
  StatisticsProjectCount,
  StatisticsProjectCountRequest,
  StatisticsProjectCountResponse,
} from '../types';
import { mapProjectCountResponse } from './statistics-mappers';
import { requireStatisticsSession } from './require-statistics-session';
import {
  isStatisticsUnauthorizedResponse,
  StatisticsUnauthorizedError,
} from './statistics-api-errors';

const getTasksCountPerProjectRpcName = 'get_tasks_count_per_project';

function getTasksCountPerProjectRequest(
  filters: Pick<StatisticsFilters, 'endDate' | 'startDate' | 'status'>,
): StatisticsProjectCountRequest {
  return {
    p_end_date: filters.endDate,
    p_start_date: filters.startDate,
    p_status: filters.status,
  };
}

export async function getTasksCountPerProject(
  filters: Pick<StatisticsFilters, 'endDate' | 'startDate' | 'status'>,
): Promise<StatisticsProjectCount[]> {
  await requireStatisticsSession();

  const { data, error } = await supabase.rpc(
    getTasksCountPerProjectRpcName,
    getTasksCountPerProjectRequest(filters),
  );

  if (error) {
    if (isStatisticsUnauthorizedResponse(error)) {
      throw new StatisticsUnauthorizedError();
    }

    throw error;
  }

  return mapProjectCountResponse(data as StatisticsProjectCountResponse);
}
