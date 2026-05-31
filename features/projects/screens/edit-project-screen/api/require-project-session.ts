import { supabase } from '@/lib/supabase';
import {
  isProjectUnauthorizedResponse,
  ProjectUnauthorizedError,
} from './project-api-errors';

export async function requireProjectSession(): Promise<string> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    if (isProjectUnauthorizedResponse(sessionError)) {
      throw new ProjectUnauthorizedError();
    }

    throw sessionError;
  }

  if (!session?.access_token) {
    throw new ProjectUnauthorizedError();
  }

  return session.access_token;
}
