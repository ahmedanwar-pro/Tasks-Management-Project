import type { ReactElement } from 'react';
import { taskDetailsDesktopMock } from '../../task-details-popup.mock';
import { TaskDetailsDesktopDialog } from '../desktop-dialog';

type TaskDetailsPopupDesktopViewProps = {
  onClose: () => void;
  onCopyLink: () => void;
};

export function TaskDetailsPopupDesktopView({
  onClose,
  onCopyLink,
}: TaskDetailsPopupDesktopViewProps): ReactElement {
  return (
    <div className="hidden lg:block">
      <TaskDetailsDesktopDialog
        details={taskDetailsDesktopMock}
        onClose={onClose}
        onCopyLink={onCopyLink}
      />
    </div>
  );
}
