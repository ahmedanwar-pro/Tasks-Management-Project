'use client';

import { useState, type ReactElement, type RefObject } from 'react';
import { EditableTaskDescriptionEditor } from './editable-task-description-editor';
import { EditableTaskDescriptionView } from './editable-task-description-view';
import { useEditableTaskDescriptionHeight } from './use-editable-task-description-height';

type EditableTaskDescriptionProps = {
  description: string;
  descriptionValue: string;
  isSaving: boolean;
  onSave: (description: string | null) => Promise<void>;
  fieldButtonRef?: RefObject<HTMLButtonElement | null>;
  variant: 'desktop' | 'tablet' | 'mobile';
};

export function EditableTaskDescription({
  description,
  descriptionValue,
  fieldButtonRef,
  isSaving,
  onSave,
  variant,
}: EditableTaskDescriptionProps): ReactElement {
  const [draft, setDraft] = useState(descriptionValue);
  const [isEditing, setIsEditing] = useState(false);
  const {
    editFieldRef,
    measureViewHeight,
    measuredEditHeight,
    resetMeasuredEditHeight,
    viewFieldRef,
  } = useEditableTaskDescriptionHeight({ isEditing, variant });

  function startEditing() {
    if (isSaving) return;

    measureViewHeight();

    setDraft(descriptionValue);
    setIsEditing(true);
  }

  async function save() {
    const nextDescription = draft.trim();
    setIsEditing(false);
    resetMeasuredEditHeight();
    if (nextDescription === descriptionValue) return;

    try {
      await onSave(nextDescription || null);
    } catch {
      setDraft(descriptionValue);
    }
  }

  const fieldPaddingClassName =
    variant === 'desktop'
      ? 'px-3 py-2.5'
      : variant === 'tablet'
        ? 'px-3 py-2.5'
        : 'px-3 py-2';

  const fieldLayoutClassName = `flex w-full items-start gap-2 ${
    variant === 'desktop' ? 'min-h-0 flex-1' : ''
  }`;

  const editFieldLayoutClassName = `flex w-full items-start gap-2 ${
    variant === 'desktop' ? 'min-h-0' : ''
  }`;

  const textareaLayoutClassName =
    variant === 'desktop' || measuredEditHeight !== undefined
      ? 'h-full min-h-0 flex-1 overflow-y-auto'
      : 'min-h-27';

  if (isEditing) {
    return (
      <EditableTaskDescriptionEditor
        descriptionValue={descriptionValue}
        draft={draft}
        editFieldLayoutClassName={editFieldLayoutClassName}
        editFieldRef={editFieldRef}
        isSaving={isSaving}
        onCancel={() => setIsEditing(false)}
        onChange={setDraft}
        onSave={() => void save()}
        textareaLayoutClassName={textareaLayoutClassName}
      />
    );
  }

  return (
    <EditableTaskDescriptionView
      description={description}
      fieldButtonRef={fieldButtonRef}
      fieldLayoutClassName={fieldLayoutClassName}
      fieldPaddingClassName={fieldPaddingClassName}
      isSaving={isSaving}
      onStartEditing={startEditing}
      variant={variant}
      viewFieldRef={viewFieldRef}
    />
  );
}
