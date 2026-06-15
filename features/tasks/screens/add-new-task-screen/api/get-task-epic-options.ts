import { supabase } from '@/lib/supabase';
import {
  isProjectUnauthorizedResponse,
  ProjectUnauthorizedError,
} from '@/features/projects/screens/edit-project-screen/api/project-api-errors';
import { requireProjectSession } from '@/features/projects/screens/edit-project-screen/api/require-project-session';
import { projectEpicsViewName } from '@/features/epics/screens/shared/api';

export type TaskEpicOption = {
  id: string;
  epicId: string;
  title: string;
};

type TaskEpicOptionResponse = {
  id: string;
  epic_id?: string | null;
  title?: string | null;
};

export type GetTaskEpicOptionsResponse = {
  epics: TaskEpicOption[];
};

function getText(value?: string | null): string {
  return value?.trim() ?? '';
}

export async function getTaskEpicOptions(
  projectId: string,
): Promise<GetTaskEpicOptionsResponse> {
  await requireProjectSession();

  // The configured Supabase client applies its active session token to this view request.
  const { data, error } = await supabase
    .from(projectEpicsViewName)
    .select('id, epic_id, title')
    .eq('project_id', projectId)
    .order('epic_id', { ascending: true });

  if (error) {
    if (isProjectUnauthorizedResponse(error)) {
      throw new ProjectUnauthorizedError();
    }

    throw error;
  }

  const epics = ((data ?? []) as TaskEpicOptionResponse[]).map((epic) => ({
    epicId: getText(epic.epic_id) || 'EPIC',
    id: epic.id,
    title: getText(epic.title) || 'Untitled epic',
  }));

  return {
    epics,
  };
}
