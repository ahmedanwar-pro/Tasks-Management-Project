import { supabase } from '@/lib/supabase';
import {
  isProjectUnauthorizedResponse,
  ProjectUnauthorizedError,
} from '@/features/projects/screens/edit-project-screen/api/project-api-errors';
import { requireProjectSession } from '@/features/projects/screens/edit-project-screen/api/require-project-session';
import { projectEpicsViewName } from '../../shared/api';
import type { ProjectEpicResponse } from '../../shared/types';

export type GetEpicDetailsRequest = {
  epicId: string;
  projectId: string;
};

export async function getEpicDetails({
  epicId,
  projectId,
}: GetEpicDetailsRequest): Promise<ProjectEpicResponse | null> {
  await requireProjectSession();

  // The configured Supabase client applies its active session token to this view request.
  const { data, error } = await supabase
    .from(projectEpicsViewName)
    .select('*')
    .eq('project_id', projectId)
    .eq('id', epicId)
    .maybeSingle();

  if (error) {
    if (isProjectUnauthorizedResponse(error)) {
      throw new ProjectUnauthorizedError();
    }

    throw error;
  }

  return (data as ProjectEpicResponse | null) ?? null;
}
