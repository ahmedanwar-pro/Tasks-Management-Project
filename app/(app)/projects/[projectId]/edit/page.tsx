import { normalizeProjectsPage } from '@/features/projects/screens/projects-list-screen/utils/projects-pagination';
import { EditProjectScreen } from '@/features/projects/screens/edit-project-screen';

type EditProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
  searchParams: Promise<{
    from?: string | string[];
    page?: string | string[];
  }>;
};

type EditProjectSource = 'list' | 'sidebar';

function parseProjectsPage(page: string | string[] | undefined): number {
  const pageValue = Array.isArray(page) ? page[0] : page;

  return normalizeProjectsPage(Number(pageValue));
}

function parseEditProjectSource(
  from: string | string[] | undefined,
): EditProjectSource {
  const sourceValue = Array.isArray(from) ? from[0] : from;

  return sourceValue === 'list' ? 'list' : 'sidebar';
}

export default async function EditProjectPage({
  params,
  searchParams,
}: EditProjectPageProps) {
  const { projectId } = await params;
  const { from, page } = await searchParams;

  return (
    <EditProjectScreen
      initialPage={parseProjectsPage(page)}
      initialSource={parseEditProjectSource(from)}
      projectId={projectId}
    />
  );
}
