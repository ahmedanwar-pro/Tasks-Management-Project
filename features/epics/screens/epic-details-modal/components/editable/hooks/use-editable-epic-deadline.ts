'use client';

import type { ChangeEvent, KeyboardEvent } from 'react';
import { useRef, useState } from 'react';
import {
  epicDeadlinePastDateMessage,
  isEpicDeadlineTodayOrFuture,
} from '@/features/epics/screens/shared/utils';
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
  const [isSaving, setIsSaving] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );
  const isManualTypingRef = useRef(false);
  const pendingDeadlineRef = useRef<string | null>(null);

  function handleEdit() {
    if (isSaving) {
      return;
    }

    setDraftDeadline(deadlineValue);
    setValidationMessage(null);
    isManualTypingRef.current = false;
    setIsEditing(true);
  }

  function saveDeadline(nextDeadline: string) {
    if (nextDeadline === deadlineValue) {
      setIsEditing(false);
      setValidationMessage(null);
      return;
    }

    if (pendingDeadlineRef.current === nextDeadline) {
      return;
    }

    if (nextDeadline && !isValidDateInputValue(nextDeadline)) {
      setDraftDeadline(deadlineValue);
      setValidationMessage(null);
      isManualTypingRef.current = false;
      setIsEditing(false);
      return;
    }

    if (!isEpicDeadlineTodayOrFuture(nextDeadline)) {
      setValidationMessage(epicDeadlinePastDateMessage);
      return;
    }

    pendingDeadlineRef.current = nextDeadline;
    setIsSaving(true);

    void onSave(nextDeadline || null)
      .then(() => {
        setValidationMessage(null);
        isManualTypingRef.current = false;
        setIsEditing(false);
      })
      .catch(() => {
        setDraftDeadline(deadlineValue);
      })
      .finally(() => {
        pendingDeadlineRef.current = null;
        setIsSaving(false);
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
      setValidationMessage(null);
      setIsEditing(false);
      event.currentTarget.blur();
      return;
    }

    isManualTypingRef.current = true;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextDeadline = event.target.value;

    setDraftDeadline(nextDeadline);
    setValidationMessage(null);

    if (
      isManualTypingRef.current ||
      !nextDeadline ||
      !isValidDateInputValue(nextDeadline)
    ) {
      return;
    }

    if (!isEpicDeadlineTodayOrFuture(nextDeadline)) {
      setValidationMessage(epicDeadlinePastDateMessage);
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
    isSaving,
    validationMessage,
  };
}
