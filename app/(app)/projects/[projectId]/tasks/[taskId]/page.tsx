import { notFound } from 'next/navigation';
import { TaskDetailsPopup } from '@/features/tasks/screens';

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const taskViewValues = new Set(['board', 'list']);

type TaskDetailsPageProps = {
  params: Promise<{
    projectId: string;
    taskId: string;
  }>;
  searchParams: Promise<{
    fromEpic?: string | string[];
    view?: string | string[];
  }>;
};

function getCloseHref({
  fromEpic,
  projectId,
  view,
}: {
  fromEpic?: string;
  projectId: string;
  view?: string;
}): string {
  if (fromEpic && uuidPattern.test(fromEpic)) {
    return `/projects/${projectId}/epics/${fromEpic}`;
  }

  if (view && taskViewValues.has(view)) {
    return `/projects/${projectId}/tasks?view=${view}`;
  }

  return `/projects/${projectId}/tasks`;
}

function getFirstSearchParam(value?: string | string[]): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function TaskDetailsPage({
  params,
  searchParams,
}: TaskDetailsPageProps) {
  const { projectId, taskId } = await params;
  const { fromEpic, view } = await searchParams;
  const currentView = getFirstSearchParam(view);
  const sourceEpicId = getFirstSearchParam(fromEpic);

  if (!uuidPattern.test(projectId) || !uuidPattern.test(taskId)) {
    notFound();
  }

  return (
    <TaskDetailsPopup
      closeHref={getCloseHref({
        fromEpic: sourceEpicId,
        projectId,
        view: currentView,
      })}
      projectId={projectId}
      taskId={taskId}
    />
  );
}
