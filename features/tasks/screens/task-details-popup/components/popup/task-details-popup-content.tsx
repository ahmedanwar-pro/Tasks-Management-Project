import type { ReactElement } from 'react';
import type {
  TaskDetailsCopyFeedback,
  TaskDetailsPopupDetails,
} from '../../task-details-popup.types';
import { useTaskDetailsPopupViewport } from '../../hooks';
import { TaskDetailsPopupDesktopView } from './task-details-popup-desktop-view';
import { TaskDetailsPopupMobileView } from './task-details-popup-mobile-view';
import { TaskDetailsPopupTabletView } from './task-details-popup-tablet-view';

type TaskDetailsPopupContentProps = {
  copyFeedback?: TaskDetailsCopyFeedback | null;
  details: TaskDetailsPopupDetails;
  onClose: () => void;
  onCopyLink: () => void;
};

export function TaskDetailsPopupContent({
  copyFeedback,
  details,
  onClose,
  onCopyLink,
}: TaskDetailsPopupContentProps): ReactElement {
  const viewport = useTaskDetailsPopupViewport();

  return (
    <>
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
    </>
  );
}
