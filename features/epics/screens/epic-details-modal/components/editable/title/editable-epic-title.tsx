'use client';

import { useId } from 'react';
import type { ReactElement } from 'react';
import type { EditableStringSaveHandler } from '../types';
import { useEditableEpicTitle } from '../hooks';
import { EditableValidationMessage } from '../editable-validation-message';
import { EditableEpicTitleInput } from './editable-epic-title-input';
import { EditableEpicTitleView } from './editable-epic-title-view';

type EditableEpicTitleProps = {
  disabled?: boolean;
  onSave: EditableStringSaveHandler;
  title: string;
};

export function EditableEpicTitle({
  disabled = false,
  onSave,
  title,
}: EditableEpicTitleProps): ReactElement {
  const validationMessageId = useId();
  const {
    draftTitle,
    handleBlur,
    handleChange,
    handleEdit,
    handleKeyDown,
    isEditing,
    validationMessage,
  } = useEditableEpicTitle({ onSave, title });

  return (
    <h2 className="min-w-0 w-full" id="epic-details-modal-title">
      <span className="sr-only">{title}</span>
      {isEditing ? (
        <span className="flex min-w-0 flex-col gap-2">
          <EditableEpicTitleInput
            describedBy={validationMessage ? validationMessageId : undefined}
            disabled={disabled}
            invalid={Boolean(validationMessage)}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={draftTitle}
          />
          {validationMessage ? (
            <EditableValidationMessage
              id={validationMessageId}
              message={validationMessage}
            />
          ) : null}
        </span>
      ) : (
        <EditableEpicTitleView
          disabled={disabled}
          onEdit={handleEdit}
          title={title}
        />
      )}
    </h2>
  );
}
