import type { ReactElement } from 'react';
import type {
  TaskDetailsCopyFeedback,
  TaskDetailsPopupDetails,
} from '../../task-details-popup.types';
import { useTaskDetailsPopupViewport } from '../../hooks';
import { TaskDetailsPopupDesktopView } from './task-details-popup-desktop-view';
import { TaskDetailsPopupMobileView } from './task-details-popup-mobile-view';
import { TaskDetailsPopupTabletView } from './task-details-popup-tablet-view';
import { EpicFormFeedback } from '@/features/epics/screens/shared/components';
import { TaskDetailsEditingProvider, useTaskDetailsEditing } from '../editable';

type TaskDetailsPopupContentProps = {
  copyFeedback?: TaskDetailsCopyFeedback | null;
  details: TaskDetailsPopupDetails;
  onClose: () => void;
  onCopyLink: () => void;
  projectId: string;
  taskId: string;
};

function TaskDetailsUpdateFeedback({
  viewport,
}: {
  viewport: ReturnType<typeof useTaskDetailsPopupViewport>;
}): ReactElement | null {
  const { closeSuccess, error, isSuccessVisible, success } =
    useTaskDetailsEditing();

  if ((!error && !success) || viewport === 'desktop') return null;

  return (
    <div className="fixed top-4 left-1/2 z-[70] w-[min(32rem,calc(100vw-2rem))] -translate-x-1/2">
      <EpicFormFeedback
        error={error ?? undefined}
        onSuccessClose={closeSuccess}
        success={success ?? undefined}
        visible={isSuccessVisible}
      />
    </div>
  );
}

export function TaskDetailsPopupContent({
  copyFeedback,
  details,
  onClose,
  onCopyLink,
  projectId,
  taskId,
}: TaskDetailsPopupContentProps): ReactElement {
  const viewport = useTaskDetailsPopupViewport();

  return (
    <TaskDetailsEditingProvider projectId={projectId} taskId={taskId}>
      <TaskDetailsUpdateFeedback viewport={viewport} />
      <TaskDetailsPopupMobileView
        details={details}
        isFocusTrapActive={viewport === 'mobile'}
        onClose={onClose}
      />
      <TaskDetailsPopupTabletView
        details={details}
        isFocusTrapActive={viewport === 'tablet'}
        onClose={onClose}
      />
      <TaskDetailsPopupDesktopView
        copyFeedback={copyFeedback}
        details={details}
        isFocusTrapActive={viewport === 'desktop'}
        onClose={onClose}
        onCopyLink={onCopyLink}
      />
    </TaskDetailsEditingProvider>
  );
}
