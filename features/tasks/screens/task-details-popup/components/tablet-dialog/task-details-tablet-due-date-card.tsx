import { useRef, type ReactElement } from 'react';
import { EditIcon } from '@/features/projects/screens/projects-list-screen/components/icons/projects-list-icons';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import { EditableTaskDueDate, useTaskDetailsEditing } from '../editable';
import { TaskDetailsCalendarIcon } from '../shared/task-details-icons';

type TaskDetailsTabletDueDateCardProps = {
  dueDate: TaskDetailsPopupDetails['dueDate'];
  dueDateValue: TaskDetailsPopupDetails['dueDateValue'];
};

export function TaskDetailsTabletDueDateCard({
  dueDate,
  dueDateValue,
}: TaskDetailsTabletDueDateCardProps): ReactElement {
  const { isFieldPending, saveField } = useTaskDetailsEditing();
  const dueDateButtonRef = useRef<HTMLButtonElement>(null);
  const isDueDatePending = isFieldPending('due_date');

  return (
    <article className="bg-surface-low flex min-h-[92px] flex-col gap-3 rounded-md p-4">
      <div className="flex items-center justify-between gap-3">
        <button
          className="text-label-sm leading-compact text-text-muted hover:text-text-secondary focus-visible:outline-primary w-fit rounded-xs font-bold uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          disabled={isDueDatePending}
          onClick={() => dueDateButtonRef.current?.click()}
          type="button"
        >
          Due Date
        </button>
        <button
          aria-label="Edit task due date"
          className="text-text-subtle hover:text-text-secondary focus-visible:text-text-secondary focus-visible:outline-primary shrink-0 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          disabled={isDueDatePending}
          onClick={() => dueDateButtonRef.current?.click()}
          type="button"
        >
          <EditIcon className="size-3.5 shrink-0 md:size-4" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <TaskDetailsCalendarIcon className="text-text-tertiary" />
        <EditableTaskDueDate
          className="text-body-sm text-text-primary leading-base font-medium"
          contentAlignment="start"
          dueDate={dueDate}
          dueDateValue={dueDateValue}
          fieldButtonRef={dueDateButtonRef}
          isSaving={isDueDatePending}
          onSave={(value) => saveField({ due_date: value })}
          showEditIcon={false}
        />
      </div>
    </article>
  );
}
