import {
  ProjectTasksBoardScreen,
  ProjectTasksListScreen,
} from '@/features/tasks/screens';

type ProjectTasksPageProps = {
  params: Promise<{
    projectId: string;
  }>;
  searchParams: Promise<{
    view?: string | string[];
  }>;
};

export default async function ProjectTasksPage({
  params,
  searchParams,
}: ProjectTasksPageProps) {
  const { projectId } = await params;
  const { view } = await searchParams;
  const currentView = Array.isArray(view) ? view[0] : view;

  if (currentView === 'list') {
    return <ProjectTasksListScreen projectId={projectId} />;
  }

  return <ProjectTasksBoardScreen projectId={projectId} />;
}
