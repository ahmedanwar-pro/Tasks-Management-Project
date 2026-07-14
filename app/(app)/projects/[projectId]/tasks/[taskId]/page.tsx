import { notFound } from 'next/navigation';
import { getProjectTasksListHref } from '@/features/tasks/screens/project-tasks-list-screen/utils/project-tasks-list-navigation';
import { normalizeProjectTasksListPage } from '@/features/tasks/screens/project-tasks-list-screen/utils/project-tasks-list-pagination';
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
    page?: string | string[];
    view?: string | string[];
  }>;
};

function shouldCloseTaskDetailsWithHistoryBack({
  fromEpic,
  view,
}: {
  fromEpic?: string;
  view?: string;
}): boolean {
  if (fromEpic && uuidPattern.test(fromEpic)) {
    return true;
  }

  return Boolean(view && taskViewValues.has(view));
}

function getCloseHref({
  fromEpic,
  page,
  projectId,
  view,
}: {
  fromEpic?: string;
  page?: number;
  projectId: string;
  view?: string;
}): string {
  if (fromEpic && uuidPattern.test(fromEpic)) {
    return `/projects/${projectId}/epics/${fromEpic}`;
  }

  if (view === 'list') {
    return getProjectTasksListHref(projectId, page);
  }

  if (view && taskViewValues.has(view)) {
    return `/projects/${projectId}/tasks?view=${view}`;
  }

  return `/projects/${projectId}/tasks`;
}

function getFirstSearchParam(value?: string | string[]): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseTaskListPage(page: string | string[] | undefined): number {
  if (Array.isArray(page)) {
    return normalizeProjectTasksListPage(Number.NaN);
  }

  return normalizeProjectTasksListPage(Number(page));
}

export default async function TaskDetailsPage({
  params,
  searchParams,
}: TaskDetailsPageProps) {
  const { projectId, taskId } = await params;
  const { fromEpic, page, view } = await searchParams;
  const currentView = getFirstSearchParam(view);
  const currentPage = parseTaskListPage(page);
  const sourceEpicId = getFirstSearchParam(fromEpic);

  if (!uuidPattern.test(projectId) || !uuidPattern.test(taskId)) {
    notFound();
  }

  return (
    <TaskDetailsPopup
      closeHref={getCloseHref({
        fromEpic: sourceEpicId,
        page: currentPage,
        projectId,
        view: currentView,
      })}
      projectId={projectId}
      shouldUseHistoryBack={shouldCloseTaskDetailsWithHistoryBack({
        fromEpic: sourceEpicId,
        view: currentView,
      })}
      taskId={taskId}
    />
  );
}
