import { supabase } from '@/lib/supabase';
import {
  isProjectUnauthorizedResponse,
  ProjectUnauthorizedError,
} from './project-api-errors';
import type { ProjectDetailsResponse } from './get-project';
import { requireProjectSession } from './require-project-session';

export type UpdateProjectRequest = {
  projectId: string;
  name: string;
  description: string;
};

export async function updateProject({
  description,
  name,
  projectId,
}: UpdateProjectRequest): Promise<ProjectDetailsResponse> {
  await requireProjectSession();

  const { data, error } = await supabase
    .from('projects')
    .update({ description, name })
    .eq('id', projectId)
    .select('id, name, description, created_at')
    .single();

  if (error) {
    if (isProjectUnauthorizedResponse(error)) {
      throw new ProjectUnauthorizedError();
    }

    throw error;
  }

  return data as ProjectDetailsResponse;
}
