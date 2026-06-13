'use client';

import { useId } from 'react';
import type { ReactElement } from 'react';
import { EpicDetailsFieldLabel } from '../../meta/epic-details-field-label';
import { useEditableEpicDescription } from '../hooks';
import type { EditableStringSaveHandler } from '../types';
import { EditableEditButton } from '../editable-edit-button';
import { EditableFieldLoadingIndicator } from '../editable-field-loading-indicator';
import { EditableValidationMessage } from '../editable-validation-message';
import { EditableEpicDescriptionTextarea } from './editable-epic-description-textarea';
import { EditableEpicDescriptionView } from './editable-epic-description-view';

type EditableEpicDescriptionProps = {
  description: string;
  descriptionValue: string;
  disabled?: boolean;
  onSave: EditableStringSaveHandler;
};

export function EditableEpicDescription({
  description,
  descriptionValue,
  disabled = false,
  onSave,
}: EditableEpicDescriptionProps): ReactElement {
  const validationMessageId = useId();
  const {
    draftDescription,
    handleBlur,
    handleChange,
    handleEdit,
    handleKeyDown,
    handlePaste,
    isEditing,
    isSaving,
    limitMessage,
    validationMessage,
  } = useEditableEpicDescription({ descriptionValue, onSave });
  const feedbackMessage = validationMessage ?? limitMessage;
  const labelAction = isEditing ? null : isSaving ? (
    <EditableFieldLoadingIndicator className="h-5 w-4" label="Saving..." />
  ) : (
    <EditableEditButton
      aria-label="Edit epic description"
      disabled={disabled}
      onClick={handleEdit}
    />
  );

  return (
    <>
      <EpicDetailsFieldLabel action={labelAction} className="md:hidden">
        Description
      </EpicDetailsFieldLabel>
      {isEditing ? (
        <div className="flex min-w-0 flex-col gap-2">
          <EditableEpicDescriptionTextarea
            describedBy={feedbackMessage ? validationMessageId : undefined}
            disabled={disabled}
            invalid={Boolean(validationMessage)}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            value={draftDescription}
          />
          {feedbackMessage ? (
            <EditableValidationMessage
              id={validationMessageId}
              message={feedbackMessage}
            />
          ) : null}
        </div>
      ) : (
        <EditableEpicDescriptionView
          description={description}
          disabled={disabled || isSaving}
          isSaving={isSaving}
          onEdit={handleEdit}
        />
      )}
    </>
  );
}
