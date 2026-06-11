'use client';

import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import type { EditableStringSaveHandler } from '../types';
import {
  epicDescriptionMaxLength,
  epicDescriptionMaxLengthMessage,
  getEpicDescriptionValidationMessage,
} from '../utils';

type UseEditableEpicDescriptionParams = {
  descriptionValue: string;
  onSave: EditableStringSaveHandler;
};

export function useEditableEpicDescription({
  descriptionValue,
  onSave,
}: UseEditableEpicDescriptionParams) {
  const [draftDescription, setDraftDescription] = useState(descriptionValue);
  const [limitMessage, setLimitMessage] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  function handleEdit() {
    if (isSaving) {
      return;
    }

    setLimitMessage(null);
    setValidationMessage(null);
    setIsEditing(true);
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const nextDescription = event.target.value;
    const nextValidationMessage =
      getEpicDescriptionValidationMessage(nextDescription);

    setDraftDescription(nextDescription);
    setValidationMessage(nextValidationMessage);

    if (
      nextValidationMessage ||
      Array.from(nextDescription).length < epicDescriptionMaxLength
    ) {
      setLimitMessage(null);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Escape') {
      setDraftDescription(descriptionValue);
      setLimitMessage(null);
      setValidationMessage(null);
      setIsEditing(false);
      event.currentTarget.blur();
      return;
    }

    if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) {
      return;
    }

    const { selectionEnd, selectionStart, value } = event.currentTarget;
    const selectedCharacterCount = Math.max(
      0,
      (selectionEnd ?? value.length) - (selectionStart ?? value.length),
    );
    const nextCharacterCount =
      Array.from(value).length - selectedCharacterCount + 1;

    if (nextCharacterCount > epicDescriptionMaxLength) {
      setLimitMessage(epicDescriptionMaxLengthMessage);
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLTextAreaElement>) {
    const pastedText = event.clipboardData.getData('text');
    const { selectionEnd, selectionStart, value } = event.currentTarget;
    const selectedCharacterCount = Math.max(
      0,
      (selectionEnd ?? value.length) - (selectionStart ?? value.length),
    );
    const nextCharacterCount =
      Array.from(value).length -
      selectedCharacterCount +
      Array.from(pastedText).length;

    if (nextCharacterCount > epicDescriptionMaxLength) {
      setLimitMessage(epicDescriptionMaxLengthMessage);
    }
  }

  function handleBlur() {
    const nextDescription = draftDescription.trim();
    const nextValidationMessage =
      getEpicDescriptionValidationMessage(draftDescription);

    if (nextValidationMessage) {
      setValidationMessage(nextValidationMessage);
      return;
    }

    setLimitMessage(null);
    setValidationMessage(null);
    setIsEditing(false);

    if (nextDescription === descriptionValue) {
      setDraftDescription(nextDescription);
      return;
    }

    setIsSaving(true);

    void onSave(nextDescription)
      .catch(() => {
        setDraftDescription(descriptionValue);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  return {
    draftDescription,
    handleBlur,
    handleChange,
    handleEdit,
    handleKeyDown,
    handlePaste,
    isEditing,
    isSaving,
    limitMessage,
    validationMessage,
  };
}
