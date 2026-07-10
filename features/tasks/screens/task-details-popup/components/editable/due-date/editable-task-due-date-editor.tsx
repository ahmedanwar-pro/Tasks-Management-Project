import type { ReactElement } from 'react';
import { Input } from '@/components/ui';
import { EditableFieldLoadingIndicator } from '@/features/epics/screens/epic-details-modal/components/editable/editable-field-loading-indicator';
import { EditableValidationMessage } from '@/features/epics/screens/epic-details-modal/components/editable/editable-validation-message';

type EditableTaskDueDateEditorProps = {
  draft: string;
  isSaving: boolean;
  min: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  validationMessage: string | null;
  validationMessageId: string;
};

export function EditableTaskDueDateEditor({
  draft,
  isSaving,
  min,
  onBlur,
  onChange,
  validationMessage,
  validationMessageId,
}: EditableTaskDueDateEditorProps): ReactElement {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <Input
        aria-label="Task due date"
        aria-describedby={validationMessage ? validationMessageId : undefined}
        aria-invalid={Boolean(validationMessage) || undefined}
        autoFocus
        className="!border-primary !bg-primary-container-muted/60 h-(--control-height-xs) min-w-0 rounded-sm border-2"
        disabled={isSaving}
        fullWidth
        iconRight={
          isSaving ? <EditableFieldLoadingIndicator label="Saving..." /> : null
        }
        iconRightAriaHidden={false}
        min={min}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        type="date"
        value={draft}
      />
      {validationMessage ? (
        <EditableValidationMessage
          id={validationMessageId}
          message={validationMessage}
        />
      ) : null}
    </div>
  );
}
