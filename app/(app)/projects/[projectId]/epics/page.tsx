import { ProjectEpicsListScreen } from '@/features/epics/screens/project-epics-list-screen/project-epics-list-screen';

type ProjectEpicsPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectEpicsPage({
  params,
}: ProjectEpicsPageProps) {
  const { projectId } = await params;

  return <ProjectEpicsListScreen projectId={projectId} />;
}
