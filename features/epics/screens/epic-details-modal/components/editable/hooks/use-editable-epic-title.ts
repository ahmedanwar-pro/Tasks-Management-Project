'use client';

import type { ChangeEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import type { EditableStringSaveHandler } from '../types';

type UseEditableEpicTitleParams = {
  onSave: EditableStringSaveHandler;
  title: string;
};

export function useEditableEpicTitle({
  onSave,
  title,
}: UseEditableEpicTitleParams) {
  const [draftTitle, setDraftTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setDraftTitle(title);
    setIsEditing(true);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setDraftTitle(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }

    if (event.key === 'Escape') {
      setDraftTitle(title);
      setIsEditing(false);
      event.currentTarget.blur();
    }
  }

  function handleBlur() {
    const nextTitle = draftTitle.trim();

    if (!nextTitle) {
      setDraftTitle(title);
      setIsEditing(false);
      return;
    }

    if (nextTitle === title) {
      setDraftTitle(nextTitle);
      setIsEditing(false);
      return;
    }

    setIsEditing(false);

    void onSave(nextTitle).catch(() => {
      setDraftTitle(title);
    });
  }

  return {
    draftTitle,
    handleBlur,
    handleChange,
    handleEdit,
    handleKeyDown,
    isEditing,
  };
}
