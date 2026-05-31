import { supabase } from '@/lib/supabase';
import {
  isProjectUnauthorizedResponse,
  ProjectUnauthorizedError,
} from './project-api-errors';
import { requireProjectSession } from './require-project-session';

export type ProjectDetailsResponse = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
};

export async function getProject(
  projectId: string,
): Promise<ProjectDetailsResponse> {
  await requireProjectSession();

  const { data, error } = await supabase
    .from('projects')
    .select('id, name, description, created_at')
    .eq('id', projectId)
    .single();

  if (error) {
    if (isProjectUnauthorizedResponse(error)) {
      throw new ProjectUnauthorizedError();
    }

    throw error;
  }

  return data as ProjectDetailsResponse;
}
