import { supabase } from '@/lib/supabase';

export type CreateEpicRequest = {
  assignee_id: string | null;
  deadline: string | null;
  description: string | null;
  project_id: string;
  title: string;
};

export type CreateEpicResponse = null;

type SupabaseApiError = {
  code?: string;
  message?: string;
};

function isEpicCounterPolicyError(error: SupabaseApiError): boolean {
  return (
    error.code === '42501' &&
    /project_epic_counters|row-level security/i.test(error.message ?? '')
  );
}

export async function createEpic(
  request: CreateEpicRequest,
): Promise<CreateEpicResponse> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  if (!session?.access_token) {
    throw new Error('Your session has expired. Please log in again.');
  }

  // The configured Supabase client applies its active session token to this REST insert.
  const { error } = await supabase.from('epics').insert(request);

  if (error) {
    if (isEpicCounterPolicyError(error)) {
      throw new Error('Unable to create epic. Please try again.');
    }

    throw error;
  }

  return null;
}
