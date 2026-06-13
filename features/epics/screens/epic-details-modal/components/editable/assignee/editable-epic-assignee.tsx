'use client';

import type { ReactElement } from 'react';
import type { EpicDetailsPerson as EpicDetailsPersonType } from '../../../types';
import { EpicDetailsMetaField } from '../../meta/epic-details-meta-field';
import { EditableEditButton } from '../editable-edit-button';
import { EditableFieldLoadingIndicator } from '../editable-field-loading-indicator';
import { useEditableEpicAssignee } from '../hooks';
import type { EditableNullableStringSaveHandler } from '../types';
import { EditableEpicAssigneeSelect } from './editable-epic-assignee-select';
import { EditableEpicAssigneeView } from './editable-epic-assignee-view';

type EditableEpicAssigneeProps = {
  assigneeId: string | null;
  disabled?: boolean;
  label: string;
  onSave: EditableNullableStringSaveHandler;
  person: EpicDetailsPersonType | null;
  projectId: string;
};

export function EditableEpicAssignee({
  assigneeId,
  disabled = false,
  label,
  onSave,
  person,
  projectId,
}: EditableEpicAssigneeProps): ReactElement {
  const {
    hasError,
    isEditing,
    isLoading,
    isSaving,
    members,
    selectRef,
    selectValue,
    handleBlur,
    handleChange,
    handleEdit,
    handleMembersRetry,
    handleSelectionSettled,
  } = useEditableEpicAssignee({
    assigneeId,
    onSave,
    person,
    projectId,
  });
  const labelAction = isEditing ? null : isSaving ? (
    <EditableFieldLoadingIndicator className="h-5 w-4" label="Saving..." />
  ) : (
    <EditableEditButton
      aria-label="Edit epic assignee"
      disabled={disabled}
      onClick={handleEdit}
    />
  );

  return (
    <EpicDetailsMetaField action={labelAction} label={label}>
      {isEditing ? (
        <EditableEpicAssigneeSelect
          disabled={disabled}
          currentAssigneeLabel={person?.name}
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
          onPointerDown={handleMembersRetry}
          ref={selectRef}
          value={selectValue}
        />
      ) : (
        <EditableEpicAssigneeView
          disabled={disabled || isSaving}
          onEdit={handleEdit}
          person={person}
        />
      )}
    </EpicDetailsMetaField>
  );
}
