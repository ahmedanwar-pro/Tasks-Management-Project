'use client';

import { useId } from 'react';
import type { ReactElement } from 'react';
import { EpicDetailsMetaField } from '../../meta/epic-details-meta-field';
import { EditableEditButton } from '../editable-edit-button';
import { EditableFieldLoadingIndicator } from '../editable-field-loading-indicator';
import { EditableValidationMessage } from '../editable-validation-message';
import { useEditableEpicDeadline } from '../hooks';
import type { EditableNullableStringSaveHandler } from '../types';
import { EditableEpicDeadlineInput } from './editable-epic-deadline-input';
import { EditableEpicDeadlineView } from './editable-epic-deadline-view';

type EditableEpicDeadlineProps = {
  deadline: string;
  deadlineValue: string;
  disabled?: boolean;
  label: string;
  onSave: EditableNullableStringSaveHandler;
};

export function EditableEpicDeadline({
  deadline,
  deadlineValue,
  disabled = false,
  label,
  onSave,
}: EditableEpicDeadlineProps): ReactElement {
  const validationMessageId = useId();
  const {
    draftDeadline,
    handleBlur,
    handleChange,
    handleEdit,
    handleKeyDown,
    isEditing,
    isSaving,
    validationMessage,
  } = useEditableEpicDeadline({ deadlineValue, onSave });
  const labelAction = isEditing ? null : isSaving ? (
    <EditableFieldLoadingIndicator className="h-5 w-4" label="Saving..." />
  ) : (
    <EditableEditButton
      aria-label="Edit epic deadline"
      disabled={disabled}
      onClick={handleEdit}
    />
  );

  return (
    <EpicDetailsMetaField action={labelAction} label={label}>
      {isEditing ? (
        <div className="flex min-w-0 flex-col gap-2">
          <EditableEpicDeadlineInput
            describedBy={validationMessage ? validationMessageId : undefined}
            disabled={disabled || isSaving}
            invalid={Boolean(validationMessage)}
            isSaving={isSaving}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={draftDeadline}
          />
          {validationMessage ? (
            <EditableValidationMessage
              id={validationMessageId}
              message={validationMessage}
            />
          ) : null}
        </div>
      ) : (
        <EditableEpicDeadlineView
          deadline={deadline}
          disabled={disabled || isSaving}
          onEdit={handleEdit}
        />
      )}
    </EpicDetailsMetaField>
  );
}
