import { useRef, type ReactElement } from 'react';
import { EditIcon } from '@/features/projects/screens/projects-list-screen/components/icons/projects-list-icons';
import { TaskDetailsDateItem } from './task-details-date-item';
import { EditableTaskDueDate, useTaskDetailsEditing } from '../../editable';

type TaskDetailsDatesSectionProps = {
  createdAt: string;
  dueDate: string;
  dueDateValue: string;
};

export function TaskDetailsDatesSection({
  createdAt,
  dueDate,
  dueDateValue,
}: TaskDetailsDatesSectionProps): ReactElement {
  const { isFieldPending, saveField } = useTaskDetailsEditing();
  const dueDateButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="border-border flex flex-col gap-4 border-t pt-4">
      <article className="flex items-center gap-2">
        <div className="flex flex-1 items-center justify-between gap-3 rounded-sm transition-colors">
          <button
            className="text-label-md text-text-secondary focus-visible:outline-primary rounded-xs leading-tight font-normal whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            disabled={isFieldPending('due_date')}
            onClick={() => dueDateButtonRef.current?.click()}
            type="button"
          >
            Due Date
          </button>
          <EditableTaskDueDate
            className="text-body-sm text-text-primary leading-base font-medium"
            dueDate={dueDate}
            dueDateValue={dueDateValue}
            fieldButtonRef={dueDateButtonRef}
            isSaving={isFieldPending('due_date')}
            showEditIcon={false}
            onSave={(value) => saveField({ due_date: value })}
          />
        </div>
        {isFieldPending('due_date') ? null : (
          <button
            aria-label="Edit task due date"
            className="text-text-subtle hover:text-text-secondary focus-visible:text-text-secondary focus-visible:outline-primary shrink-0 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => dueDateButtonRef.current?.click()}
            type="button"
          >
            <EditIcon className="size-3.5 shrink-0 md:size-4" />
          </button>
        )}
      </article>
      <TaskDetailsDateItem label="Created At" value={createdAt} />
    </div>
  );
}
