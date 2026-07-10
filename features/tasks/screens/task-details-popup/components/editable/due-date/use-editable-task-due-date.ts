'use client';

import { useId, useState } from 'react';
import { isValidTaskDueDate, taskDueDatePastMessage } from '../../../utils';

export function useEditableTaskDueDate({
  dueDateValue,
  onSave,
}: {
  dueDateValue: string;
  onSave: (dueDate: string | null) => Promise<void>;
}) {
  const validationMessageId = useId();
  const [draft, setDraft] = useState(dueDateValue.slice(0, 10));
  const [isEditing, setIsEditing] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  async function change(nextValue: string) {
    setDraft(nextValue);
    if (nextValue && !isValidTaskDueDate(nextValue)) {
      setValidationMessage(taskDueDatePastMessage);
      return;
    }

    setValidationMessage(null);
    if (nextValue === dueDateValue.slice(0, 10)) {
      setIsEditing(false);
      return;
    }

    try {
      await onSave(nextValue || null);
      setIsEditing(false);
    } catch {
      setDraft(dueDateValue.slice(0, 10));
    }
  }

  function startEditing() {
    setDraft(dueDateValue.slice(0, 10));
    setValidationMessage(null);
    setIsEditing(true);
  }

  function stopEditingOnBlur() {
    if (!validationMessage) setIsEditing(false);
  }

  return {
    change,
    draft,
    isEditing,
    startEditing,
    stopEditingOnBlur,
    validationMessage,
    validationMessageId,
  };
}
