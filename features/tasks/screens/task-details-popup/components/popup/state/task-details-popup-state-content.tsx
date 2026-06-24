import type { ReactElement } from 'react';
import { EpicDetailsModalLoadingState } from '@/features/epics/screens/epic-details-modal/components/loading';
import { TaskDetailsEmptyContent } from './task-details-empty-content';
import { TaskDetailsErrorState } from './task-details-error-state';
import type { TaskDetailsPopupStateContentProps } from './task-details-popup-state.types';

export function TaskDetailsPopupStateContent({
  message,
  onRetry,
  type,
}: TaskDetailsPopupStateContentProps): ReactElement {
  if (type === 'loading') {
    return <EpicDetailsModalLoadingState />;
  }

  if (type === 'error' && onRetry) {
    return <TaskDetailsErrorState onRetry={onRetry} />;
  }

  return <TaskDetailsEmptyContent message={message} />;
}
