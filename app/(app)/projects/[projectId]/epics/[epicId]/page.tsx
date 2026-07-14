import { notFound } from 'next/navigation';
import { EpicDetailsModal } from '@/features/epics/screens/epic-details-modal';
import type { EpicDetailsTaskSuccessType } from '@/features/epics/screens/epic-details-modal/utils/epic-details-task-navigation';
import { normalizeProjectEpicsPage } from '@/features/epics/screens/project-epics-list-screen/utils';

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type EpicDetailsPageProps = {
  params: Promise<{
    epicId: string;
    projectId: string;
  }>;
  searchParams: Promise<{
    from?: string | string[];
    page?: string | string[];
    taskSuccess?: string | string[];
  }>;
};

function parseProjectEpicsPage(page: string | string[] | undefined): number {
  const pageValue = Array.isArray(page) ? page[0] : page;

  return normalizeProjectEpicsPage(Number(pageValue));
}

export default async function EpicDetailsPage({
  params,
  searchParams,
}: EpicDetailsPageProps) {
  const { epicId, projectId } = await params;
  const { from, page, taskSuccess } = await searchParams;
  const source = Array.isArray(from) ? from[0] : from;
  const taskSuccessType = Array.isArray(taskSuccess)
    ? taskSuccess[0]
    : taskSuccess;
  const normalizedTaskSuccessType: EpicDetailsTaskSuccessType | undefined =
    taskSuccessType === 'created' ? taskSuccessType : undefined;

  if (!uuidPattern.test(epicId)) {
    notFound();
  }

  return (
    <EpicDetailsModal
      epicId={epicId}
      initialPage={parseProjectEpicsPage(page)}
      projectId={projectId}
      shouldUseHistoryBack={source === 'list'}
      taskSuccessType={normalizedTaskSuccessType}
    />
  );
}
