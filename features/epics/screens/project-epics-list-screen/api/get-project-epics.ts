import { supabase } from '@/lib/supabase';
import {
  isProjectUnauthorizedResponse,
  ProjectUnauthorizedError,
} from '@/features/projects/screens/edit-project-screen/api/project-api-errors';
import { requireProjectSession } from '@/features/projects/screens/edit-project-screen/api/require-project-session';
import type {
  GetProjectEpicsRequest,
  GetProjectEpicsResponse,
  ProjectEpicResponse,
} from './project-epics-api-types';

const projectEpicsViewName = 'project_epics';

export async function getProjectEpics({
  limit,
  offset,
  projectId,
}: GetProjectEpicsRequest): Promise<GetProjectEpicsResponse> {
  await requireProjectSession();

  // The configured Supabase client applies its active session token to this view request.
  const { count, data, error } = await supabase
    .from(projectEpicsViewName)
    .select('*', { count: 'exact' })
    .eq('project_id', projectId)
    .range(offset, offset + limit - 1);

  if (error) {
    if (isProjectUnauthorizedResponse(error)) {
      throw new ProjectUnauthorizedError();
    }

    throw error;
  }

  const epics = (data ?? []) as ProjectEpicResponse[];

  return {
    epics,
    totalCount: count ?? epics.length,
  };
}
