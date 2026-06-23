import type { ReactElement } from 'react';
import { TaskDetailsPopupDesktopView } from './task-details-popup-desktop-view';
import { TaskDetailsPopupMobileView } from './task-details-popup-mobile-view';
import { TaskDetailsPopupTabletView } from './task-details-popup-tablet-view';

type TaskDetailsPopupContentProps = {
  onClose: () => void;
  onCopyLink: () => void;
};

export function TaskDetailsPopupContent({
  onClose,
  onCopyLink,
}: TaskDetailsPopupContentProps): ReactElement {
  return (
    <>
      <TaskDetailsPopupMobileView onClose={onClose} />
      <TaskDetailsPopupTabletView onClose={onClose} />
      <TaskDetailsPopupDesktopView onClose={onClose} onCopyLink={onCopyLink} />
    </>
  );
}
