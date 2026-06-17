import { AddNewTaskScreen } from '@/features/tasks/screens';
import {
  taskStatusValues,
  type TaskStatus,
} from '@/features/tasks/screens/add-new-task-screen/add-new-task-form-schema';

type NewTaskPageProps = {
  params: Promise<{
    projectId: string;
  }>;
  searchParams: Promise<{
    epicId?: string | string[];
    status?: string | string[];
  }>;
};

function getInitialStatus(value?: string | string[]): TaskStatus | undefined {
  const status = Array.isArray(value) ? value[0] : value;

  if (!status) {
    return undefined;
  }

  return taskStatusValues.find((taskStatus) => taskStatus === status);
}

export default async function NewTaskPage({
  params,
  searchParams,
}: NewTaskPageProps) {
  const { projectId } = await params;
  const { epicId, status } = await searchParams;
  const initialEpicId = Array.isArray(epicId) ? epicId[0] : epicId;
  const initialStatus = getInitialStatus(status);

  return (
    <AddNewTaskScreen
      initialEpicId={initialEpicId}
      initialStatus={initialStatus}
      projectId={projectId}
    />
  );
}
