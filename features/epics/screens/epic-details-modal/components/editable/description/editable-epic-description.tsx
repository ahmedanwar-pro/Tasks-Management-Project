'use client';

import type { KeyboardEvent, ReactElement } from 'react';
import { useState } from 'react';
import { EditableEpicDescriptionTextarea } from './editable-epic-description-textarea';
import { EditableEpicDescriptionView } from './editable-epic-description-view';

type EditableEpicDescriptionProps = {
  description: string;
  descriptionValue: string;
  disabled?: boolean;
  onSave: (description: string) => Promise<void>;
};

export function EditableEpicDescription({
  description,
  descriptionValue,
  disabled = false,
  onSave,
}: EditableEpicDescriptionProps): ReactElement {
  const [draftDescription, setDraftDescription] = useState(descriptionValue);
  const [isEditing, setIsEditing] = useState(false);

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

  return isEditing ? (
    <EditableEpicDescriptionTextarea
      disabled={disabled}
      onBlur={handleBlur}
      onChange={(event) => {
        setDraftDescription(event.target.value);
      }}
      onKeyDown={handleKeyDown}
      value={draftDescription}
    />
  ) : (
    <EditableEpicDescriptionView
      description={description}
      disabled={disabled}
      onEdit={() => {
        setIsEditing(true);
      }}
    />
  );
}
