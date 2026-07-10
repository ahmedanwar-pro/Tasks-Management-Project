import type { ReactElement, RefObject } from 'react';
import { EditableFieldLoadingIndicator } from '@/features/epics/screens/epic-details-modal/components/editable/editable-field-loading-indicator';
import { EditIcon } from '@/features/projects/screens/projects-list-screen/components/icons/projects-list-icons';

type EditableTaskDueDateViewProps = {
  className?: string;
  contentAlignment: 'end' | 'start';
  dueDate: string;
  fieldButtonRef?: RefObject<HTMLButtonElement | null>;
  isSaving: boolean;
  onStartEditing: () => void;
  showEditIcon: boolean;
};

export function EditableTaskDueDateView({
  className,
  contentAlignment,
  dueDate,
  fieldButtonRef,
  isSaving,
  onStartEditing,
  showEditIcon,
}: EditableTaskDueDateViewProps): ReactElement {
  return (
    <div
      className={`${className ?? ''} flex min-w-0 flex-1 items-center ${contentAlignment === 'start' ? 'justify-start' : 'justify-end'} gap-2`}
    >
      <button
        ref={fieldButtonRef}
        className={`enabled:hover:bg-primary-container-muted/35 focus-visible:outline-primary inline-flex w-fit min-w-0 shrink-0 rounded-sm px-2 py-1.5 text-right transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${isSaving ? 'cursor-wait opacity-60' : ''}`}
        disabled={isSaving}
        onClick={onStartEditing}
        type="button"
      >
        <span className="block min-w-0 truncate">{dueDate}</span>
      </button>
      {isSaving ? (
        <EditableFieldLoadingIndicator label="Saving..." />
      ) : showEditIcon ? (
        <button
          aria-label="Edit task due date"
          className="text-text-subtle hover:text-text-secondary focus-visible:text-text-secondary focus-visible:outline-primary shrink-0 rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={onStartEditing}
          type="button"
        >
          <EditIcon className="size-3.5 shrink-0 md:size-4" />
        </button>
      ) : null}
    </div>
  );
}
