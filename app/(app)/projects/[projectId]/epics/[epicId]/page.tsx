import { redirect } from 'next/navigation';

type EpicDetailsPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function EpicDetailsPage({
  params,
}: EpicDetailsPageProps) {
  const { projectId } = await params;

  redirect(`/projects/${projectId}/epics`);
}
