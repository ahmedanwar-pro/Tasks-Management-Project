import type { ReactElement } from 'react';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import { TaskDetailsTabletDialog } from '../tablet-dialog';

type TaskDetailsPopupTabletViewProps = {
  details: TaskDetailsPopupDetails;
  isFocusTrapActive: boolean;
  onClose: () => void;
};

export function TaskDetailsPopupTabletView({
  details,
  isFocusTrapActive,
  onClose,
}: TaskDetailsPopupTabletViewProps): ReactElement {
  return (
    <div className="hidden md:block lg:hidden">
      <TaskDetailsTabletDialog
        details={details}
        isFocusTrapActive={isFocusTrapActive}
        onClose={onClose}
      />
    </div>
  );
}
