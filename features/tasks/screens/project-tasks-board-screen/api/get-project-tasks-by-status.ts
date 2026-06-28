import { supabase } from '@/lib/supabase';
import {
  isProjectUnauthorizedResponse,
  ProjectUnauthorizedError,
} from '@/features/projects/screens/edit-project-screen/api/project-api-errors';
import { requireProjectSession } from '@/features/projects/screens/edit-project-screen/api/require-project-session';
import type { TaskStatus } from '../../add-new-task-screen/add-new-task-form-schema';

export type GetProjectTasksByStatusRequest = {
  projectId: string;
  status: TaskStatus;
};

export type GetProjectTasksByStatusPageRequest =
  GetProjectTasksByStatusRequest & {
    limit: number;
    offset: number;
  };

export type GetProjectTasksByStatusPageResponse = {
  tasks: ProjectTaskResponse[];
  totalCount: number;
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

export type ProjectTaskResponse = {
  id: string;
  task_id?: string | null;
  project_id?: string | null;
  epic_id?: string | null;
  title?: string | null;
  due_date?: string | null;
  status?: TaskStatus | string | null;
  assignee?: ProjectTaskPersonResponse | string | null;
  assignee_id?: string | null;
  assignee_name?: string | null;
  assignee_full_name?: string | null;
  assignee_display_name?: string | null;
  assignee_email?: string | null;
  assignee_avatar?: string | null;
  assignee_avatar_url?: string | null;
};

export function getProjectTasksByStatus(
  request: GetProjectTasksByStatusPageRequest,
): Promise<GetProjectTasksByStatusPageResponse>;
export function getProjectTasksByStatus(
  request: GetProjectTasksByStatusRequest,
): Promise<ProjectTaskResponse[]>;
export async function getProjectTasksByStatus(
  request: GetProjectTasksByStatusRequest | GetProjectTasksByStatusPageRequest,
): Promise<ProjectTaskResponse[] | GetProjectTasksByStatusPageResponse> {
  const { projectId, status } = request;
  const isPaginatedRequest = 'limit' in request;

  await requireProjectSession();

  // The configured Supabase client applies its active session token to this view request.
  const projectTasksQuery = supabase.from('project_tasks');
  let query = (
    isPaginatedRequest
      ? projectTasksQuery.select('*', { count: 'exact' })
      : projectTasksQuery.select('*')
  )
    .eq('project_id', projectId)
    .eq('status', status)
    .order('due_date', { ascending: true, nullsFirst: false });

  if (isPaginatedRequest) {
    query = query
      .order('id', { ascending: true })
      .range(request.offset, request.offset + request.limit - 1);
  }

  const { count, data, error } = await query;

  if (error) {
    if (isProjectUnauthorizedResponse(error)) {
      throw new ProjectUnauthorizedError();
    }

    throw error;
  }

  const tasks = (data ?? []) as ProjectTaskResponse[];

  if (isPaginatedRequest) {
    return {
      tasks,
      totalCount: count ?? tasks.length,
    };
  }

  return tasks;
}
