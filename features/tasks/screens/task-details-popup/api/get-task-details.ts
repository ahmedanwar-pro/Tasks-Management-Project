import { supabase } from '@/lib/supabase';
import {
  isProjectUnauthorizedResponse,
  ProjectUnauthorizedError,
} from '@/features/projects/screens/edit-project-screen/api/project-api-errors';
import { requireProjectSession } from '@/features/projects/screens/edit-project-screen/api/require-project-session';
import type { ProjectTaskPersonResponse } from '../../project-tasks-board-screen/api';

export type GetTaskDetailsRequest = {
  projectId: string;
  taskId: string;
};

type TaskDetailsTextValue = string | null | undefined;

type TaskDetailsEpicResponse = {
  epic_id?: TaskDetailsTextValue;
  key?: TaskDetailsTextValue;
  label?: TaskDetailsTextValue;
  name?: TaskDetailsTextValue;
  title?: TaskDetailsTextValue;
};

export type TaskDetailsResponse = {
  id: string;
  task_id?: TaskDetailsTextValue;
  assignee_id?: TaskDetailsTextValue;
  epic_id?: TaskDetailsTextValue;
  epic?: TaskDetailsEpicResponse | string | null;
  epic_key?: TaskDetailsTextValue;
  epic_label?: TaskDetailsTextValue;
  epic_title?: TaskDetailsTextValue;
  title?: TaskDetailsTextValue;
  description?: TaskDetailsTextValue;
  due_date?: TaskDetailsTextValue;
  created_at?: TaskDetailsTextValue;
  status?: TaskDetailsTextValue;
  assignee?: ProjectTaskPersonResponse | string | null;
  assignee_name?: TaskDetailsTextValue;
  assignee_full_name?: TaskDetailsTextValue;
  assignee_display_name?: TaskDetailsTextValue;
  assignee_email?: TaskDetailsTextValue;
  assignee_department?: TaskDetailsTextValue;
  assignee_job_title?: TaskDetailsTextValue;
  assignee_jobTitle?: TaskDetailsTextValue;
  assignee_position?: TaskDetailsTextValue;
  reporter?: ProjectTaskPersonResponse | string | null;
  reporter_name?: TaskDetailsTextValue;
  reporter_full_name?: TaskDetailsTextValue;
  reporter_display_name?: TaskDetailsTextValue;
  reporter_email?: TaskDetailsTextValue;
  reporter_department?: TaskDetailsTextValue;
  reporter_job_title?: TaskDetailsTextValue;
  reporter_jobTitle?: TaskDetailsTextValue;
  reporter_position?: TaskDetailsTextValue;
  created_by?: ProjectTaskPersonResponse | string | null;
  created_by_name?: TaskDetailsTextValue;
  created_by_full_name?: TaskDetailsTextValue;
  created_by_display_name?: TaskDetailsTextValue;
  created_by_email?: TaskDetailsTextValue;
  created_by_department?: TaskDetailsTextValue;
  created_by_job_title?: TaskDetailsTextValue;
  created_by_jobTitle?: TaskDetailsTextValue;
  created_by_position?: TaskDetailsTextValue;
};

export async function getTaskDetails({
  projectId,
  taskId,
}: GetTaskDetailsRequest): Promise<TaskDetailsResponse[]> {
  await requireProjectSession();

  const { data, error } = await supabase
    .from('project_tasks')
    .select('*')
    .eq('project_id', projectId)
    .eq('id', taskId)
    .limit(1);

  if (error) {
    if (isProjectUnauthorizedResponse(error)) {
      throw new ProjectUnauthorizedError();
    }

    throw error;
  }

  return (data ?? []) as TaskDetailsResponse[];
}
