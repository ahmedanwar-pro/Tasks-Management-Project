import type { ReactElement } from 'react';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import { TaskDetailsTabletDescription } from './task-details-tablet-description';
import { TaskDetailsTabletMetaGrid } from './task-details-tablet-meta-grid';
import { TaskDetailsTabletStatusRow } from './task-details-tablet-status-row';

type TaskDetailsTabletContentProps = {
  details: TaskDetailsPopupDetails;
};

export function TaskDetailsTabletContent({
  details,
}: TaskDetailsTabletContentProps): ReactElement {
  return (
    <div className="bg-surface min-h-0 flex-1 overflow-y-auto px-8 py-8">
      <div className="grid gap-6">
        <TaskDetailsTabletStatusRow details={details} />
        <TaskDetailsTabletMetaGrid details={details} />
        <TaskDetailsTabletDescription description={details.description} />
      </div>
    </div>
  );
}
