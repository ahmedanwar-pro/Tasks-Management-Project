'use client';

import { useState, type ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { EditableFieldLoadingIndicator } from '@/features/epics/screens/epic-details-modal/components/editable/editable-field-loading-indicator';
import { EditIcon } from '@/features/projects/screens/projects-list-screen/components/icons/projects-list-icons';
import {
  getTaskTitleValidationMessage,
  taskTitleMaxLength,
} from '../../../utils';

type EditableTaskTitleProps = {
  className?: string;
  headingId: string;
  isSaving: boolean;
  onInvalid: () => void;
  onSave: (title: string) => Promise<void>;
  title: string;
};

export function EditableTaskTitle({
  className,
  headingId,
  isSaving,
  onInvalid,
  onSave,
  title,
}: EditableTaskTitleProps): ReactElement {
  const [draft, setDraft] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  function startEditing() {
    if (isSaving) return;
    setDraft(title);
    setValidationMessage(null);
    setIsEditing(true);
  }

  async function save() {
    const nextTitle = draft.trim();
    const message = getTaskTitleValidationMessage(nextTitle);

    if (message) {
      setDraft(title);
      setValidationMessage(message);
      setIsEditing(false);
      onInvalid();
      return;
    }

    setValidationMessage(null);
    setIsEditing(false);
    if (nextTitle === title) return;

    try {
      await onSave(nextTitle);
    } catch {
      setDraft(title);
    }
  }

  return (
    <div className="min-w-0">
      <h2 className={className} id={headingId}>
        {isEditing ? (
          <input
            aria-label="Task title"
            aria-invalid={Boolean(validationMessage) || undefined}
            autoFocus
            className="border-primary bg-primary-container-muted/60 font-inherit leading-inherit h-auto w-full min-w-0 rounded-sm border-2 px-2 py-0.5 text-inherit outline-none"
            disabled={isSaving}
            maxLength={taskTitleMaxLength}
            onBlur={() => void save()}
            onChange={(event) => {
              setDraft(event.target.value);
              setValidationMessage(
                getTaskTitleValidationMessage(event.target.value.trim()),
              );
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') event.currentTarget.blur();
              if (event.key === 'Escape') {
                setDraft(title);
                setValidationMessage(null);
                setIsEditing(false);
              }
            }}
            required
            value={draft}
          />
        ) : (
          <div className="flex max-w-full items-center gap-2">
            <button
              className={joinClasses(
                'enabled:hover:bg-primary-container-muted/35 focus-visible:outline-primary min-w-0 flex-1 rounded-xs px-2 py-1.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2',
                isSaving && 'cursor-wait opacity-60',
              )}
              disabled={isSaving}
              onClick={startEditing}
              type="button"
            >
              <span className="block min-w-0 truncate">{title}</span>
            </button>
            {isSaving ? (
              <EditableFieldLoadingIndicator label="Saving..." />
            ) : (
              <button
                aria-label="Edit task title"
                className="text-text-subtle hover:text-text-secondary focus-visible:text-text-secondary focus-visible:outline-primary rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={startEditing}
                type="button"
              >
                <EditIcon className="size-3.5 shrink-0 md:size-4" />
              </button>
            )}
          </div>
        )}
      </h2>
      {validationMessage ? (
        <p className="text-danger-text mt-1 text-xs" role="alert">
          {validationMessage}
        </p>
      ) : null}
    </div>
  );
}
