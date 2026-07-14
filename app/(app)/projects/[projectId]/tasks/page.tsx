import {
  ProjectTasksBoardScreen,
  ProjectTasksListScreen,
} from '@/features/tasks/screens';
import type { ProjectTasksListSuccessType } from '@/features/tasks/screens/project-tasks-list-screen/utils/project-tasks-list-navigation';

type ProjectTasksPageProps = {
  params: Promise<{
    projectId: string;
  }>;
  searchParams: Promise<{
    success?: string | string[];
    view?: string | string[];
  }>;
};

export default async function ProjectTasksPage({
  params,
  searchParams,
}: ProjectTasksPageProps) {
  const { projectId } = await params;
  const { success, view } = await searchParams;
  const currentView = Array.isArray(view) ? view[0] : view;
  const successType = Array.isArray(success) ? success[0] : success;
  const normalizedSuccessType: ProjectTasksListSuccessType | undefined =
    successType === 'created' ? successType : undefined;

  if (currentView === 'board') {
    return <ProjectTasksBoardScreen projectId={projectId} />;
  }

  return (
    <ProjectTasksListScreen
      projectId={projectId}
      successType={normalizedSuccessType}
    />
  );
}
