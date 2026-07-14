import { ProjectEpicsListScreen } from '@/features/epics/screens/project-epics-list-screen/project-epics-list-screen';
import {
  normalizeProjectEpicsPage,
  type ProjectEpicsListSuccessType,
} from '@/features/epics/screens/project-epics-list-screen/utils';

type ProjectEpicsPageProps = {
  params: Promise<{
    projectId: string;
  }>;
  searchParams: Promise<{
    page?: string | string[];
    success?: string | string[];
  }>;
};

function parseProjectEpicsPage(page: string | string[] | undefined): number {
  const pageValue = Array.isArray(page) ? page[0] : page;

  return normalizeProjectEpicsPage(Number(pageValue));
}

function parseProjectEpicsSuccessType(
  success: string | string[] | undefined,
): ProjectEpicsListSuccessType | undefined {
  const successValue = Array.isArray(success) ? success[0] : success;

  return successValue === 'created' ? 'created' : undefined;
}

export default async function ProjectEpicsPage({
  params,
  searchParams,
}: ProjectEpicsPageProps) {
  const { projectId } = await params;
  const { page, success } = await searchParams;

  return (
    <ProjectEpicsListScreen
      initialPage={parseProjectEpicsPage(page)}
      projectId={projectId}
      successType={parseProjectEpicsSuccessType(success)}
    />
  );
}
