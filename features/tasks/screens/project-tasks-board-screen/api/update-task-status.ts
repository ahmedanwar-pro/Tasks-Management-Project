import { supabase } from '@/lib/supabase';
import {
  isProjectUnauthorizedResponse,
  ProjectUnauthorizedError,
} from '@/features/projects/screens/edit-project-screen/api/project-api-errors';
import { requireProjectSession } from '@/features/projects/screens/edit-project-screen/api/require-project-session';
import type { TaskStatus } from '../../add-new-task-screen/add-new-task-form-schema';

export type UpdateTaskStatusRequest = {
  status: TaskStatus;
  taskId: string;
};

export type UpdateTaskStatusResponse = null;

export async function updateTaskStatus({
  status,
  taskId,
}: UpdateTaskStatusRequest): Promise<UpdateTaskStatusResponse> {
  const normalizedTaskId = taskId.trim();

  if (!normalizedTaskId) {
    throw new Error('Task id is required');
  }

  await requireProjectSession();

  const { error } = await supabase
    .from('tasks')
    .update({ status })
    .eq('id', normalizedTaskId)
    .select('id')
    .single();

  if (error) {
    if (isProjectUnauthorizedResponse(error)) {
      throw new ProjectUnauthorizedError();
    }

    throw error;
  }

  return null;
}
