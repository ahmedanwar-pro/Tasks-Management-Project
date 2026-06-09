'use client';

import type { ReactElement } from 'react';
import { useEditableEpicDescription } from '../hooks';
import type { EditableStringSaveHandler } from '../types';
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
  const {
    draftDescription,
    handleBlur,
    handleChange,
    handleEdit,
    handleKeyDown,
    isEditing,
  } = useEditableEpicDescription({ descriptionValue, onSave });

  return isEditing ? (
    <EditableEpicDescriptionTextarea
      disabled={disabled}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={draftDescription}
    />
  ) : (
    <EditableEpicDescriptionView
      description={description}
      disabled={disabled}
      onEdit={handleEdit}
    />
  );
}
