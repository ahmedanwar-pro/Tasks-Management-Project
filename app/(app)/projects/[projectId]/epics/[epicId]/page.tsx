import { notFound } from 'next/navigation';
import { EpicDetailsModal } from '@/features/epics/screens/epic-details-modal';

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type EpicDetailsPageProps = {
  params: Promise<{
    epicId: string;
    projectId: string;
  }>;
};

export default async function EpicDetailsPage({
  params,
}: EpicDetailsPageProps) {
  const { epicId, projectId } = await params;

  if (!uuidPattern.test(epicId)) {
    notFound();
  }

  return <EpicDetailsModal epicId={epicId} projectId={projectId} />;
}
