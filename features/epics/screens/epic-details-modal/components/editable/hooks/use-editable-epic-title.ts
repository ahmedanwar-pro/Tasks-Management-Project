'use client';

import type { ChangeEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import type { EditableStringSaveHandler } from '../types';
import { getEpicTitleValidationMessage } from '../utils';

type UseEditableEpicTitleParams = {
  onSave: EditableStringSaveHandler;
  title: string;
};

export function useEditableEpicTitle({
  onSave,
  title,
}: UseEditableEpicTitleParams) {
  const [draftTitle, setDraftTitle] = useState(title);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  function handleEdit() {
    if (isSaving) {
      return;
    }

    setDraftTitle(title);
    setValidationMessage(null);
    setIsEditing(true);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextTitle = event.target.value;

    setDraftTitle(nextTitle);
    setValidationMessage(getEpicTitleValidationMessage(nextTitle.trim()));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }

    if (event.key === 'Escape') {
      setDraftTitle(title);
      setValidationMessage(null);
      setIsEditing(false);
      event.currentTarget.blur();
    }
  }

  function handleBlur() {
    const nextTitle = draftTitle.trim();

    const nextValidationMessage = getEpicTitleValidationMessage(nextTitle);

    if (nextValidationMessage) {
      setValidationMessage(nextValidationMessage);
      return;
    }

    setValidationMessage(null);

    if (nextTitle === title) {
      setDraftTitle(nextTitle);
      setIsEditing(false);
      return;
    }

    setIsEditing(false);

    setIsSaving(true);

    void onSave(nextTitle)
      .catch(() => {
        setDraftTitle(title);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  return {
    draftTitle,
    handleBlur,
    handleChange,
    handleEdit,
    handleKeyDown,
    isEditing,
    isSaving,
    validationMessage,
  };
}
