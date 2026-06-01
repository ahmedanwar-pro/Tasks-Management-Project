import { supabase } from '@/lib/supabase';
import {
  isProjectMembersUnauthorizedResponse,
  ProjectMembersUnauthorizedError,
} from './project-members-api-errors';

export async function requireProjectMembersSession(): Promise<string> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    if (isProjectMembersUnauthorizedResponse(sessionError)) {
      throw new ProjectMembersUnauthorizedError();
    }

    throw sessionError;
  }

  if (!session?.access_token) {
    throw new ProjectMembersUnauthorizedError();
  }

  return session.access_token;
}
