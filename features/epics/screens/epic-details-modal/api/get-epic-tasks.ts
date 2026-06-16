import { supabase } from '@/lib/supabase';
import {
  isProjectUnauthorizedResponse,
  ProjectUnauthorizedError,
} from '@/features/projects/screens/edit-project-screen/api/project-api-errors';
import { requireProjectSession } from '@/features/projects/screens/edit-project-screen/api/require-project-session';

export type GetEpicTasksRequest = {
  epicId: string;
  projectId: string;
};

export type ProjectTaskResponse = {
  id: string;
  task_id?: string | null;
  project_id?: string | null;
  epic_id?: string | null;
  title?: string | null;
  due_date?: string | null;
  assignee?: ProjectTaskPersonResponse | string | null;
  assignee_id?: string | null;
  assignee_name?: string | null;
  assignee_full_name?: string | null;
  assignee_display_name?: string | null;
  assignee_email?: string | null;
  assignee_avatar?: string | null;
  assignee_avatar_url?: string | null;
};

export type ProjectTaskPersonResponse = {
  id?: string | null;
  member_id?: string | null;
  user_id?: string | null;
  profile_id?: string | null;
  name?: string | null;
  full_name?: string | null;
  display_name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
};

export async function getEpicTasks({
  epicId,
  projectId,
}: GetEpicTasksRequest): Promise<ProjectTaskResponse[]> {
  await requireProjectSession();

  // The configured Supabase client applies its active session token to this view request.
  const { data, error } = await supabase
    .from('project_tasks')
    .select('*')
    .eq('project_id', projectId)
    .eq('epic_id', epicId)
    .order('due_date', { ascending: true, nullsFirst: false });

  if (error) {
    if (isProjectUnauthorizedResponse(error)) {
      throw new ProjectUnauthorizedError();
    }

    throw error;
  }

  return (data ?? []) as ProjectTaskResponse[];
}
