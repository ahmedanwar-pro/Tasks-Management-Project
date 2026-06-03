export type ProjectEpicPersonResponse = {
  name?: string | null;
  full_name?: string | null;
  display_name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
};

export type GetProjectEpicsRequest = {
  limit: number;
  offset: number;
  projectId: string;
};

export type ProjectEpicResponse = {
  id: string;
  epic_id?: string | null;
  project_id?: string | null;
  title?: string | null;
  deadline?: string | null;
  created_at?: string | null;
  assignee?: ProjectEpicPersonResponse | string | null;
  assignee_name?: string | null;
  assignee_full_name?: string | null;
  assignee_display_name?: string | null;
  assignee_email?: string | null;
  assignee_avatar_url?: string | null;
  created_by?: ProjectEpicPersonResponse | string | null;
  created_by_name?: string | null;
  created_by_full_name?: string | null;
  created_by_display_name?: string | null;
  created_by_email?: string | null;
  creator?: ProjectEpicPersonResponse | string | null;
  creator_name?: string | null;
  creator_full_name?: string | null;
  creator_display_name?: string | null;
  creator_email?: string | null;
};

export type GetProjectEpicsResponse = {
  epics: ProjectEpicResponse[];
  totalCount: number;
};
