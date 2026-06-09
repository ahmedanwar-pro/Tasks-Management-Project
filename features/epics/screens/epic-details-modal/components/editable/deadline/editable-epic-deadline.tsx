'use client';

import type { ReactElement } from 'react';
import { EditableEpicDeadlineInput } from './editable-epic-deadline-input';
import { EditableEpicDeadlineView } from './editable-epic-deadline-view';
import { useEditableEpicDeadline } from './use-editable-epic-deadline';

type EditableEpicDeadlineProps = {
  deadline: string;
  deadlineValue: string;
  disabled?: boolean;
  onSave: (deadline: string | null) => Promise<void>;
};

export function EditableEpicDeadline({
  deadline,
  deadlineValue,
  disabled = false,
  onSave,
}: EditableEpicDeadlineProps): ReactElement {
  const {
    draftDeadline,
    handleBlur,
    handleChange,
    handleEdit,
    handleKeyDown,
    isEditing,
  } = useEditableEpicDeadline({ deadlineValue, onSave });

  if (isEditing) {
    return (
      <EditableEpicDeadlineInput
        disabled={disabled}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={draftDeadline}
      />
    );
  }

  return (
    <EditableEpicDeadlineView
      deadline={deadline}
      disabled={disabled}
      onEdit={handleEdit}
    />
  );
}
