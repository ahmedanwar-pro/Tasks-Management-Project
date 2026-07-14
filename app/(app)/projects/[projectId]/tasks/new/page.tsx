import { AddNewTaskScreen } from '@/features/tasks/screens';
import { normalizeProjectEpicsPage } from '@/features/epics/screens/project-epics-list-screen/utils';
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
    from?: string | string[];
    page?: string | string[];
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
  const { epicId, from, page, status } = await searchParams;
  const initialEpicId = Array.isArray(epicId) ? epicId[0] : epicId;
  const initialSource = Array.isArray(from) ? from[0] : from;
  const initialPage = normalizeProjectEpicsPage(
    Number(Array.isArray(page) ? page[0] : page),
  );
  const initialStatus = getInitialStatus(status);

  return (
    <AddNewTaskScreen
      initialEpicId={initialEpicId}
      initialPage={initialPage}
      initialSource={
        initialSource === 'epic-details' ? initialSource : undefined
      }
      initialStatus={initialStatus}
      projectId={projectId}
    />
  );
}
