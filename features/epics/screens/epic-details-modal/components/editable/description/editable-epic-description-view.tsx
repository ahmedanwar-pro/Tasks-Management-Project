import type { ReactElement } from 'react';
import { EditableEditButton } from '../editable-edit-button';
import { EditableFieldLoadingIndicator } from '../editable-field-loading-indicator';

type EditableEpicDescriptionViewProps = {
  description: string;
  disabled: boolean;
  isSaving: boolean;
  onEdit: () => void;
};

export function EditableEpicDescriptionView({
  description,
  disabled,
  isSaving,
  onEdit,
}: EditableEpicDescriptionViewProps): ReactElement {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <button
        aria-label="Edit epic description"
        className="min-w-0 flex-1 rounded-sm text-left text-body-sm leading-base text-text-tertiary outline-offset-4 transition-colors hover:bg-primary-container-muted/60 focus-visible:bg-primary-container-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary md:text-body-md md:leading-[26px] md:text-text-primary/80"
        disabled={disabled}
        onClick={onEdit}
        type="button"
      >
        {description}
      </button>
      {isSaving ? (
        <EditableFieldLoadingIndicator className="h-5 w-4" label="Saving..." />
      ) : (
        <EditableEditButton
          aria-label="Edit epic description"
          disabled={disabled}
          onClick={onEdit}
        />
      )}
    </div>
  );
}
