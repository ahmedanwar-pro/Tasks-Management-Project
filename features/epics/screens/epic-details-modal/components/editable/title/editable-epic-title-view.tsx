import type { ReactElement } from 'react';
import { EditableEditButton } from '../editable-edit-button';
import { EditableFieldLoadingIndicator } from '../editable-field-loading-indicator';

type EditableEpicTitleViewProps = {
  disabled: boolean;
  isSaving: boolean;
  onEdit: () => void;
  title: string;
};

export function EditableEpicTitleView({
  disabled,
  isSaving,
  onEdit,
  title,
}: EditableEpicTitleViewProps): ReactElement {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <button
        aria-label="Edit epic title"
        className="min-w-0 flex-1 rounded-sm text-left text-title-lg leading-6.25 font-bold tracking-normal text-text-primary outline-offset-4 transition-colors hover:bg-primary-container-muted/60 focus-visible:bg-primary-container-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary md:text-headline-md md:leading-section"
        disabled={disabled}
        onClick={onEdit}
        type="button"
      >
        <span className="break-words">{title}</span>
      </button>
      {isSaving ? (
        <EditableFieldLoadingIndicator className="h-5 w-4" label="Saving..." />
      ) : (
        <EditableEditButton
          aria-label="Edit epic title"
          disabled={disabled}
          onClick={onEdit}
        />
      )}
    </div>
  );
}
