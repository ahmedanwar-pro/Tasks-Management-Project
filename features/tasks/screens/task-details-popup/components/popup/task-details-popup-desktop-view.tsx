import type { ReactElement } from 'react';
import type {
  TaskDetailsCopyFeedback,
  TaskDetailsPopupDetails,
} from '../../task-details-popup.types';
import { TaskDetailsDesktopDialog } from '../desktop-dialog';

type TaskDetailsPopupDesktopViewProps = {
  copyFeedback?: TaskDetailsCopyFeedback | null;
  details: TaskDetailsPopupDetails;
  isFocusTrapActive: boolean;
  onClose: () => void;
  onCopyLink: () => void;
};

export function TaskDetailsPopupDesktopView({
  copyFeedback,
  details,
  isFocusTrapActive,
  onClose,
  onCopyLink,
}: TaskDetailsPopupDesktopViewProps): ReactElement {
  return (
    <div className="hidden lg:block">
      <TaskDetailsDesktopDialog
        copyFeedback={copyFeedback}
        details={details}
        isFocusTrapActive={isFocusTrapActive}
        onClose={onClose}
        onCopyLink={onCopyLink}
      />
    </div>
  );
}
