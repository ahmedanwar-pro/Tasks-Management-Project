import { EpicDetailsModalClose } from './epic-details-modal-close';

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

  return (
    <div
      aria-labelledby="epic-details-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
      role="dialog"
    >
      <div className="bg-surface text-text-primary w-full max-w-md rounded-md p-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-text-secondary text-sm">Epic details</p>
            <h2
              className="mt-1 text-xl font-semibold"
              id="epic-details-modal-title"
            >
              Selected epic
            </h2>
          </div>
          <EpicDetailsModalClose projectId={projectId} />
        </div>
        <p className="text-text-secondary mt-6 text-sm">epicId: {epicId}</p>
      </div>
    </div>
  );
}
