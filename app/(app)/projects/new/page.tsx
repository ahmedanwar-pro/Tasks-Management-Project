import { AddNewProjectScreen } from '@/features/projects/screens/add-new-project-screen';
import { normalizeProjectsPage } from '@/features/projects/screens/projects-list-screen/utils/projects-pagination';

type NewProjectPageProps = {
  searchParams: Promise<{
    page?: string | string[];
  }>;
};

function parseProjectsPage(page: string | string[] | undefined): number {
  const pageValue = Array.isArray(page) ? page[0] : page;

  return normalizeProjectsPage(Number(pageValue));
}

export default async function NewProjectPage({
  searchParams,
}: NewProjectPageProps) {
  const { page } = await searchParams;

  return <AddNewProjectScreen initialPage={parseProjectsPage(page)} />;
}
