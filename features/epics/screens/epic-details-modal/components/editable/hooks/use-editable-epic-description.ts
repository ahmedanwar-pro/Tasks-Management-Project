'use client';

import type { ChangeEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import type { EditableStringSaveHandler } from '../types';

type UseEditableEpicDescriptionParams = {
  descriptionValue: string;
  onSave: EditableStringSaveHandler;
};

export function useEditableEpicDescription({
  descriptionValue,
  onSave,
}: UseEditableEpicDescriptionParams) {
  const [draftDescription, setDraftDescription] = useState(descriptionValue);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setDraftDescription(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Escape') {
      setDraftDescription(descriptionValue);
      setIsEditing(false);
      event.currentTarget.blur();
    }
  }

  function handleBlur() {
    const nextDescription = draftDescription.trim();

    setIsEditing(false);

    if (nextDescription === descriptionValue) {
      setDraftDescription(nextDescription);
      return;
    }

    void onSave(nextDescription).catch(() => {
      setDraftDescription(descriptionValue);
    });
  }

  return {
    draftDescription,
    handleBlur,
    handleChange,
    handleEdit,
    handleKeyDown,
    isEditing,
  };
}
