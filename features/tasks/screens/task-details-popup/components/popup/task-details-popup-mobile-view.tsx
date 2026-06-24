import type { ReactElement } from 'react';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import { TaskDetailsMobileSheet } from '../mobile-sheet';

type TaskDetailsPopupMobileViewProps = {
  details: TaskDetailsPopupDetails;
  isFocusTrapActive: boolean;
  onClose: () => void;
};

export function TaskDetailsPopupMobileView({
  details,
  isFocusTrapActive,
  onClose,
}: TaskDetailsPopupMobileViewProps): ReactElement {
  return (
    <div className="md:hidden">
      <TaskDetailsMobileSheet
        details={details}
        isFocusTrapActive={isFocusTrapActive}
        onClose={onClose}
      />
    </div>
  );
}
