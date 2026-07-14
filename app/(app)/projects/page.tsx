import { ProjectsListScreen } from '@/features/projects/screens/projects-list-screen/projects-list-screen';
import { normalizeProjectsPage } from '@/features/projects/screens/projects-list-screen/utils/projects-pagination';
import type { ProjectsListSuccessType } from '@/features/projects/screens/projects-list-screen/utils/projects-list-navigation';

type ProjectsPageProps = {
  searchParams: Promise<{
    page?: string | string[];
    success?: string | string[];
  }>;
};

function parseProjectsSuccessType(
  success: string | string[] | undefined,
): ProjectsListSuccessType | undefined {
  const successValue = Array.isArray(success) ? success[0] : success;

  return successValue === 'created' || successValue === 'updated'
    ? successValue
    : undefined;
}

function parseProjectsPage(page: string | string[] | undefined): number {
  const pageValue = Array.isArray(page) ? page[0] : page;

  return normalizeProjectsPage(Number(pageValue));
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const { page, success } = await searchParams;

  return (
    <ProjectsListScreen
      initialPage={parseProjectsPage(page)}
      successType={parseProjectsSuccessType(success)}
    />
  );
}
