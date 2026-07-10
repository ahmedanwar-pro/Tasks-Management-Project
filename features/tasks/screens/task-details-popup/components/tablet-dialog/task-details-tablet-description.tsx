import { useRef, type ReactElement } from 'react';
import { EditableFieldLoadingIndicator } from '@/features/epics/screens/epic-details-modal/components/editable/editable-field-loading-indicator';
import { EditIcon } from '@/features/projects/screens/projects-list-screen/components/icons/projects-list-icons';
import { EditableTaskDescription, useTaskDetailsEditing } from '../editable';

type TaskDetailsTabletDescriptionProps = {
  description: string;
  descriptionValue: string;
};

export function TaskDetailsTabletDescription({
  description,
  descriptionValue,
}: TaskDetailsTabletDescriptionProps): ReactElement {
  const { isFieldPending, saveField } = useTaskDetailsEditing();
  const descriptionButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <section
      aria-labelledby="task-details-tablet-description"
      className="flex flex-col gap-3"
    >
      <h3
        className="text-label-sm leading-compact text-text-secondary flex items-center gap-1 font-bold tracking-normal uppercase"
        id="task-details-tablet-description"
      >
        <span>Description</span>
        {isFieldPending('description') ? (
          <EditableFieldLoadingIndicator label="Saving..." />
        ) : (
          <button
            aria-label="Edit task description"
            className="text-text-subtle hover:text-text-secondary focus-visible:text-text-secondary focus-visible:outline-primary rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => descriptionButtonRef.current?.click()}
            type="button"
          >
            <EditIcon className="size-3.5 shrink-0 md:size-4" />
          </button>
        )}
      </h3>
      <div className="border-border-subtle bg-surface rounded-md border p-5 shadow-sm">
        <EditableTaskDescription
          description={description}
          descriptionValue={descriptionValue}
          fieldButtonRef={descriptionButtonRef}
          isSaving={isFieldPending('description')}
          onSave={(value) => saveField({ description: value })}
          variant="tablet"
        />
      </div>
    </section>
  );
}
