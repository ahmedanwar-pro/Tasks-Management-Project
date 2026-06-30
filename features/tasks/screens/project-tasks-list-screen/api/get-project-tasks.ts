import {
  isProjectUnauthorizedResponse,
  ProjectUnauthorizedError,
} from '@/features/projects/screens/edit-project-screen/api/project-api-errors';
import { requireProjectSession } from '@/features/projects/screens/edit-project-screen/api/require-project-session';
import { supabase } from '@/lib/supabase';
import type { ProjectTaskResponse } from '../../project-tasks-board-screen/api';
import type {
  GetProjectTasksRequest,
  GetProjectTasksResponse,
} from './project-tasks-api-types';

export async function getProjectTasks({
  limit,
  offset,
  projectId,
  searchTerm,
}: GetProjectTasksRequest): Promise<GetProjectTasksResponse> {
  await requireProjectSession();

  const normalizedSearchTerm = searchTerm?.trim() ?? '';

  // The configured Supabase client applies its active session token to this view request.
  let query = supabase
    .from('project_tasks')
    .select('*', { count: 'exact' })
    .eq('project_id', projectId)
    .setHeader('Content-Type', 'application/json');

  if (normalizedSearchTerm) {
    query = query.ilike('title', `%${normalizedSearchTerm}%`);
  }

  const { count, data, error } = await query
    .order('due_date', { ascending: true, nullsFirst: false })
    .order('id', { ascending: true })
    .range(offset, offset + limit - 1);

  if (error) {
    if (isProjectUnauthorizedResponse(error)) {
      throw new ProjectUnauthorizedError();
    }

    throw error;
  }

  if (count === null) {
    throw new Error('Project tasks response is missing an exact count');
  }

  const tasks = (data ?? []) as ProjectTaskResponse[];

  return {
    tasks,
    totalCount: count,
  };
}
