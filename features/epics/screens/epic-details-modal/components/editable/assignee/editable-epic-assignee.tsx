'use client';

import type { ReactElement } from 'react';
import type { EpicDetailsPerson as EpicDetailsPersonType } from '../../../types';
import { EditableEpicAssigneeSelect } from './editable-epic-assignee-select';
import { EditableEpicAssigneeView } from './editable-epic-assignee-view';
import { useEditableEpicAssignee } from './hooks';

type EditableEpicAssigneeProps = {
  assigneeId: string | null;
  disabled?: boolean;
  onSave: (assigneeId: string | null) => Promise<void>;
  person: EpicDetailsPersonType | null;
  projectId: string;
};

export function EditableEpicAssignee({
  assigneeId,
  disabled = false,
  onSave,
  person,
  projectId,
}: EditableEpicAssigneeProps): ReactElement {
  const {
    hasError,
    isEditing,
    isLoading,
    members,
    selectRef,
    selectValue,
    handleBlur,
    handleChange,
    handleEdit,
    handleSelectionSettled,
  } = useEditableEpicAssignee({
    assigneeId,
    onSave,
    person,
    projectId,
  });

  if (isEditing) {
    return (
      <EditableEpicAssigneeSelect
        disabled={disabled}
        hasError={hasError}
        isLoading={isLoading}
        members={members}
        onBlur={handleBlur}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        onKeyUp={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleSelectionSettled();
          }
        }}
        onMouseUp={handleSelectionSettled}
        ref={selectRef}
        value={selectValue}
      />
    );
  }

  return (
    <EditableEpicAssigneeView
      disabled={disabled}
      onEdit={handleEdit}
      person={person}
    />
  );
}
