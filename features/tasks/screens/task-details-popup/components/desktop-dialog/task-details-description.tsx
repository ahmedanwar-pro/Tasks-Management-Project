import { useRef, type ReactElement } from 'react';
import { EditableFieldLoadingIndicator } from '@/features/epics/screens/epic-details-modal/components/editable/editable-field-loading-indicator';
import { EditIcon } from '@/features/projects/screens/projects-list-screen/components/icons/projects-list-icons';
import { EditableTaskDescription, useTaskDetailsEditing } from '../editable';

type TaskDetailsDescriptionProps = {
  description: string;
  descriptionValue: string;
};

export function TaskDetailsDescription({
  description,
  descriptionValue,
}: TaskDetailsDescriptionProps): ReactElement {
  const { isFieldPending, saveField } = useTaskDetailsEditing();
  const descriptionButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <section
      aria-labelledby="task-details-description"
      className="flex h-full min-h-0 w-full flex-col gap-3"
    >
      <h3
        className="text-label-sm text-text-secondary leading-compact flex items-center gap-1 font-bold tracking-[0.5px] uppercase"
        id="task-details-description"
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
      <div className="border-border-subtle bg-surface min-h-0 flex flex-1 flex-col rounded-md border shadow-sm">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="min-h-full p-5 pr-6">
            <EditableTaskDescription
              description={description}
              descriptionValue={descriptionValue}
              fieldButtonRef={descriptionButtonRef}
              isSaving={isFieldPending('description')}
              onSave={(value) => saveField({ description: value })}
              variant="desktop"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
