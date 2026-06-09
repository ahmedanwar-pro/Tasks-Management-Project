'use client';

import type { ChangeEvent, KeyboardEvent } from 'react';
import { useRef, useState } from 'react';
import type { EditableNullableStringSaveHandler } from '../types';
import { isValidDateInputValue } from '../utils';

type UseEditableEpicDeadlineParams = {
  deadlineValue: string;
  onSave: EditableNullableStringSaveHandler;
};

export function useEditableEpicDeadline({
  deadlineValue,
  onSave,
}: UseEditableEpicDeadlineParams) {
  const [draftDeadline, setDraftDeadline] = useState(deadlineValue);
  const [isEditing, setIsEditing] = useState(false);
  const isManualTypingRef = useRef(false);
  const pendingDeadlineRef = useRef<string | null>(null);

  function handleEdit() {
    setDraftDeadline(deadlineValue);
    isManualTypingRef.current = false;
    setIsEditing(true);
  }

  function saveDeadline(nextDeadline: string) {
    if (nextDeadline === deadlineValue) {
      setIsEditing(false);
      return;
    }

    if (pendingDeadlineRef.current === nextDeadline) {
      return;
    }

    if (nextDeadline && !isValidDateInputValue(nextDeadline)) {
      setDraftDeadline(deadlineValue);
      isManualTypingRef.current = false;
      setIsEditing(false);
      return;
    }

    pendingDeadlineRef.current = nextDeadline;

    void onSave(nextDeadline || null)
      .then(() => {
        isManualTypingRef.current = false;
        setIsEditing(false);
      })
      .catch(() => {
        setDraftDeadline(deadlineValue);
      })
      .finally(() => {
        pendingDeadlineRef.current = null;
      });
  }

  function handleBlur() {
    isManualTypingRef.current = false;
    saveDeadline(draftDeadline);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      isManualTypingRef.current = false;
      setDraftDeadline(deadlineValue);
      setIsEditing(false);
      event.currentTarget.blur();
      return;
    }

    isManualTypingRef.current = true;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextDeadline = event.target.value;

    setDraftDeadline(nextDeadline);

    if (
      isManualTypingRef.current ||
      !nextDeadline ||
      !isValidDateInputValue(nextDeadline)
    ) {
      return;
    }

    saveDeadline(nextDeadline);
  }

  return {
    draftDeadline,
    handleBlur,
    handleChange,
    handleEdit,
    handleKeyDown,
    isEditing,
  };
}
