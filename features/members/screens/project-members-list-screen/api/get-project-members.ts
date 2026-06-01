import { supabase } from '@/lib/supabase';
import {
  isProjectMembersUnauthorizedResponse,
  ProjectMembersUnauthorizedError,
} from './project-members-api-errors';
import { requireProjectMembersSession } from './require-project-members-session';

const getProjectMembersViewName = 'get_project_members';

export type ProjectMemberRoleResponse =
  | 'OWNER'
  | 'Owner'
  | 'owner'
  | 'ADMIN'
  | 'Admin'
  | 'admin'
  | 'MEMBER'
  | 'Member'
  | 'member'
  | 'VIEWER'
  | 'Viewer'
  | 'viewer';

export type ProjectMemberResponse = {
  id?: string | null;
  member_id?: string | null;
  user_id?: string | null;
  profile_id?: string | null;
  project_id?: string | null;
  name?: string | null;
  full_name?: string | null;
  display_name?: string | null;
  member_name?: string | null;
  member_full_name?: string | null;
  profile_name?: string | null;
  user_name?: string | null;
  email?: string | null;
  user_email?: string | null;
  avatar_url?: string | null;
  role?: ProjectMemberRoleResponse | string | null;
};

export type GetProjectMembersResponse = {
  members: ProjectMemberResponse[];
};

export async function getProjectMembers(
  projectId: string,
): Promise<GetProjectMembersResponse> {
  await requireProjectMembersSession();

  // The configured Supabase client applies its active session token to this view request.
  const { data, error } = await supabase
    .from(getProjectMembersViewName)
    .select('*')
    .eq('project_id', projectId);

  if (error) {
    if (isProjectMembersUnauthorizedResponse(error)) {
      throw new ProjectMembersUnauthorizedError();
    }

    throw error;
  }

  const members = (data ?? []) as ProjectMemberResponse[];

  return {
    members,
  };
}

export { isProjectMembersUnauthorizedError } from './project-members-api-errors';
