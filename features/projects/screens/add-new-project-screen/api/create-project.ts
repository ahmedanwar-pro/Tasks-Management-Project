import { supabase } from '@/lib/supabase';

export type CreateProjectRequest = {
  name: string;
  description: string;
};

export type CreateProjectResponse = {
  id: string;
};

export async function createProject(
  request: CreateProjectRequest,
): Promise<CreateProjectResponse> {
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
  const { data, error } = await supabase
    .from('projects')
    .insert(request)
    .select('id')
    .single();

  if (error) {
    throw error;
  }

  return data;
}
