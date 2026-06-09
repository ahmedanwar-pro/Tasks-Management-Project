'use client';

import type { ReactElement } from 'react';
import type { EditableStringSaveHandler } from '../types';
import { useEditableEpicTitle } from '../hooks';
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
  const {
    draftTitle,
    handleBlur,
    handleChange,
    handleEdit,
    handleKeyDown,
    isEditing,
  } = useEditableEpicTitle({ onSave, title });

  return (
    <h2 className="min-w-0 w-full" id="epic-details-modal-title">
      <span className="sr-only">{title}</span>
      {isEditing ? (
        <EditableEpicTitleInput
          disabled={disabled}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={draftTitle}
        />
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
