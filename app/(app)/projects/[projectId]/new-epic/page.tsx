import { redirect } from 'next/navigation';

type NewEpicPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function NewEpicPage({ params }: NewEpicPageProps) {
  const { projectId } = await params;

  redirect(`/projects/${projectId}/epics/new`);
}
