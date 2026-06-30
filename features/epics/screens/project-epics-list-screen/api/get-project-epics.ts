import { supabase } from '@/lib/supabase';
import {
  isProjectUnauthorizedResponse,
  ProjectUnauthorizedError,
} from '@/features/projects/screens/edit-project-screen/api/project-api-errors';
import { requireProjectSession } from '@/features/projects/screens/edit-project-screen/api/require-project-session';
import { projectEpicsViewName } from '../../shared/api';
import type { ProjectEpicResponse } from '../../shared/types';
import type {
  GetProjectEpicsRequest,
  GetProjectEpicsResponse,
} from './project-epics-api-types';

export async function getProjectEpics({
  limit,
  offset,
  projectId,
  searchTerm,
}: GetProjectEpicsRequest): Promise<GetProjectEpicsResponse> {
  await requireProjectSession();

  const normalizedSearchTerm = searchTerm?.trim() ?? '';

  // The configured Supabase client applies its active session token to this view request.
  let query = supabase
    .from(projectEpicsViewName)
    .select('*', { count: 'exact' })
    .eq('project_id', projectId)
    .setHeader('Content-Type', 'application/json');

  if (normalizedSearchTerm) {
    query = query.ilike('title', `%${normalizedSearchTerm}%`);
  }

  const { count, data, error } = await query
    .order('id', { ascending: true })
    .range(offset, offset + limit - 1);

  if (error) {
    if (isProjectUnauthorizedResponse(error)) {
      throw new ProjectUnauthorizedError();
    }

    throw error;
  }

  if (count === null) {
    throw new Error('Project epics response is missing an exact count');
  }

  const epics = (data ?? []) as ProjectEpicResponse[];

  return {
    epics,
    totalCount: count,
  };
}
