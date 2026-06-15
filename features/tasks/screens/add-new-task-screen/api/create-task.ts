import { supabase } from '@/lib/supabase';
import type { TaskStatus } from '../add-new-task-form-schema';

export type CreateTaskRequest = {
  assignee_id: string | null;
  description: string | null;
  due_date: string | null;
  epic_id: string | null;
  project_id: string;
  status: TaskStatus;
  title: string;
};

export type CreateTaskResponse = null;

export async function createTask(
  request: CreateTaskRequest,
): Promise<CreateTaskResponse> {
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
  const { error } = await supabase.from('tasks').insert(request);

  if (error) {
    throw error;
  }

  return null;
}
