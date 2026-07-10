'use client';

import type { ReactElement, RefObject } from 'react';
import { EditableTaskDueDateEditor } from './editable-task-due-date-editor';
import { EditableTaskDueDateView } from './editable-task-due-date-view';
import { useEditableTaskDueDate } from './use-editable-task-due-date';

type EditableTaskDueDateProps = {
  className?: string;
  contentAlignment?: 'end' | 'start';
  dueDate: string;
  dueDateValue: string;
  fieldButtonRef?: RefObject<HTMLButtonElement | null>;
  isSaving: boolean;
  showEditIcon?: boolean;
  onSave: (dueDate: string | null) => Promise<void>;
};

function getTodayInputValue(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export function EditableTaskDueDate({
  className,
  contentAlignment = 'end',
  dueDate,
  dueDateValue,
  fieldButtonRef,
  isSaving,
  showEditIcon = true,
  onSave,
}: EditableTaskDueDateProps): ReactElement {
  const {
    change,
    draft,
    isEditing,
    startEditing,
    stopEditingOnBlur,
    validationMessage,
    validationMessageId,
  } = useEditableTaskDueDate({ dueDateValue, onSave });

  if (isEditing) {
    return (
      <EditableTaskDueDateEditor
        draft={draft}
        isSaving={isSaving}
        min={getTodayInputValue()}
        onBlur={stopEditingOnBlur}
        onChange={(nextValue) => void change(nextValue)}
        validationMessage={validationMessage}
        validationMessageId={validationMessageId}
      />
    );
  }

  return (
    <EditableTaskDueDateView
      className={className}
      contentAlignment={contentAlignment}
      dueDate={dueDate}
      fieldButtonRef={fieldButtonRef}
      isSaving={isSaving}
      onStartEditing={startEditing}
      showEditIcon={showEditIcon}
    />
  );
}
