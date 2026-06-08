import { supabase } from '@/lib/supabase';
import {
  isProjectUnauthorizedResponse,
  ProjectUnauthorizedError,
} from '@/features/projects/screens/edit-project-screen/api/project-api-errors';
import { requireProjectSession } from '@/features/projects/screens/edit-project-screen/api/require-project-session';
import type { ProjectEpicResponse } from '../../shared/types';
import { getEpicDetails } from './get-epic-details';

export type UpdateEpicRequest = {
  assigneeId?: string | null;
  description?: string | null;
  epicId: string;
  projectId: string;
  title?: string;
};

export async function updateEpic({
  assigneeId,
  description,
  epicId,
  projectId,
  title,
}: UpdateEpicRequest): Promise<ProjectEpicResponse | null> {
  await requireProjectSession();

  const updates: {
    assignee_id?: string | null;
    description?: string | null;
    title?: string;
  } = {};

  if (assigneeId !== undefined) {
    updates.assignee_id = assigneeId;
  }

  if (title !== undefined) {
    updates.title = title;
  }

  if (description !== undefined) {
    updates.description = description;
  }

  const { error } = await supabase
    .from('epics')
    .update(updates)
    .eq('id', epicId)
    .eq('project_id', projectId)
    .select('id')
    .single();

  if (error) {
    if (isProjectUnauthorizedResponse(error)) {
      throw new ProjectUnauthorizedError();
    }

    throw error;
  }

  return getEpicDetails({ epicId, projectId });
}
