import { AddNewEpicScreen } from '@/features/epics/screens/add-new-epic-screen/add-new-epic-screen';

type NewEpicPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function NewEpicPage({ params }: NewEpicPageProps) {
  const { projectId } = await params;

  return <AddNewEpicScreen projectId={projectId} />;
}
