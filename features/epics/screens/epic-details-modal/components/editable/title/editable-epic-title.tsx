'use client';

import type { KeyboardEvent, ReactElement } from 'react';
import { useState } from 'react';
import { EditableEpicTitleInput } from './editable-epic-title-input';
import { EditableEpicTitleView } from './editable-epic-title-view';

type EditableEpicTitleProps = {
  disabled?: boolean;
  onSave: (title: string) => Promise<void>;
  title: string;
};

export function EditableEpicTitle({
  disabled = false,
  onSave,
  title,
}: EditableEpicTitleProps): ReactElement {
  const [draftTitle, setDraftTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setDraftTitle(title);
    setIsEditing(true);
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

  return (
    <h2 className="min-w-0 w-full" id="epic-details-modal-title">
      <span className="sr-only">{title}</span>
      {isEditing ? (
        <EditableEpicTitleInput
          disabled={disabled}
          onBlur={handleBlur}
          onChange={(event) => {
            setDraftTitle(event.target.value);
          }}
          onKeyDown={handleKeyDown}
          value={draftTitle}
        />
      ) : (
        <EditableEpicTitleView
          disabled={disabled}
          onEdit={handleEdit}
          title={title}
        />
      )}
    </h2>
  );
}
