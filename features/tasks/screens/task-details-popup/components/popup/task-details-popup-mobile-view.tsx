import type { ReactElement } from 'react';
import { taskDetailsMobileMock } from '../../task-details-popup.mock';
import { TaskDetailsMobileSheet } from '../mobile-sheet';

type TaskDetailsPopupMobileViewProps = {
  onClose: () => void;
};

export function TaskDetailsPopupMobileView({
  onClose,
}: TaskDetailsPopupMobileViewProps): ReactElement {
  return (
    <div className="md:hidden">
      <TaskDetailsMobileSheet
        details={taskDetailsMobileMock}
        onClose={onClose}
      />
    </div>
  );
}
