import type { ReactElement } from 'react';
import { TaskDetailsDateItem } from './task-details-date-item';

type TaskDetailsDatesSectionProps = {
  createdAt: string;
  dueDate: string;
};

export function TaskDetailsDatesSection({
  createdAt,
  dueDate,
}: TaskDetailsDatesSectionProps): ReactElement {
  return (
    <div className="border-border flex flex-col gap-4 border-t pt-4">
      <TaskDetailsDateItem label="Due Date" value={dueDate} />
      <TaskDetailsDateItem label="Created At" value={createdAt} />
    </div>
  );
}
