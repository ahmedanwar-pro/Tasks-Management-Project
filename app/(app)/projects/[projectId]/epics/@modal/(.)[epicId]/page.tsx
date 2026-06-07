import { EpicDetailsModal } from '@/features/epics/screens/epic-details-modal';

type EpicDetailsModalPageProps = {
  params: Promise<{
    epicId: string;
    projectId: string;
  }>;
};

export default async function EpicDetailsModalPage({
  params,
}: EpicDetailsModalPageProps) {
  const { epicId, projectId } = await params;

  return <EpicDetailsModal epicId={epicId} projectId={projectId} />;
}
