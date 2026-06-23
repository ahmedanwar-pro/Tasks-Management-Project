import type { ReactElement } from 'react';
import { taskDetailsDesktopMock } from '../../task-details-popup.mock';
import { TaskDetailsTabletDialog } from '../tablet-dialog';

type TaskDetailsPopupTabletViewProps = {
  onClose: () => void;
};

export function TaskDetailsPopupTabletView({
  onClose,
}: TaskDetailsPopupTabletViewProps): ReactElement {
  return (
    <div className="hidden md:block lg:hidden">
      <TaskDetailsTabletDialog
        details={taskDetailsDesktopMock}
        onClose={onClose}
      />
    </div>
  );
}
