'use client';

import { useRef, useState } from 'react';
import type { EpicDetailsPerson as EpicDetailsPersonType } from '../../../../types';
import type { EditableNullableStringSaveHandler } from '../../types';
import {
  getInferredAssigneeId,
  getSelectValue,
  normalizeAssigneeId,
} from '../../utils';
import { useAssigneeMemberOptions } from './use-assignee-member-options';
import { useAssigneeSelectPicker } from './use-assignee-select-picker';

type UseEditableEpicAssigneeParams = {
  assigneeId: string | null;
  onSave: EditableNullableStringSaveHandler;
  person: EpicDetailsPersonType | null;
  projectId: string;
};

export function useEditableEpicAssignee({
  assigneeId,
  onSave,
  person,
  projectId,
}: UseEditableEpicAssigneeParams) {
  const currentAssigneeId = normalizeAssigneeId(assigneeId);
  const currentSelectValue = currentAssigneeId ?? '';
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draftAssigneeId, setDraftAssigneeId] = useState(currentSelectValue);
  const [isSaving, setIsSaving] = useState(false);
  const { hasError, isLoading, members } = useAssigneeMemberOptions({
    isEditing,
    projectId,
  });
  const inferredCurrentAssigneeId = getInferredAssigneeId({
    currentAssigneeId,
    members,
    personName: person?.name,
  });
  const effectiveCurrentSelectValue = inferredCurrentAssigneeId ?? '';

  useAssigneeSelectPicker({
    hasError,
    isEditing,
    isLoading,
    selectRef,
  });

  function handleEdit() {
    if (isSaving) {
      return;
    }

    setDraftAssigneeId(currentSelectValue);
    setIsEditing(true);
  }

  function handleBlur() {
    setIsEditing(false);
  }

  function handleChange(nextAssigneeId: string) {
    const nextNormalizedAssigneeId = normalizeAssigneeId(nextAssigneeId);

    setDraftAssigneeId(nextAssigneeId);
    setIsEditing(false);

    if (nextNormalizedAssigneeId === inferredCurrentAssigneeId) {
      return;
    }

    setIsSaving(true);

    void onSave(nextNormalizedAssigneeId)
      .catch(() => {
        setDraftAssigneeId(effectiveCurrentSelectValue);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  function handleSelectionSettled() {
    window.setTimeout(() => {
      const selectedAssigneeId = normalizeAssigneeId(selectRef.current?.value);

      if (selectedAssigneeId === inferredCurrentAssigneeId) {
        setIsEditing(false);
      }
    }, 0);
  }

  return {
    hasError,
    isEditing,
    isLoading,
    isSaving,
    members,
    selectRef,
    selectValue: getSelectValue({
      currentSelectValue,
      draftAssigneeId,
      effectiveCurrentSelectValue,
      isLoading,
    }),
    handleBlur,
    handleChange,
    handleEdit,
    handleSelectionSettled,
  };
}
