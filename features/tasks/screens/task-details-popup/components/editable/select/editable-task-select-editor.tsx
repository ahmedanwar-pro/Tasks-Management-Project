import type { ReactElement, RefObject } from 'react';
import { EditableFieldLoadingIndicator } from '@/features/epics/screens/epic-details-modal/components/editable/editable-field-loading-indicator';
import { EditableValidationMessage } from '@/features/epics/screens/epic-details-modal/components/editable/editable-validation-message';
import { TaskDetailsChevronDownIcon } from '../../shared/task-details-icons';
import type { EditableTaskSelectOption } from './editable-task-select';
import { getEditableTaskSelectEmptyLabel } from './editable-task-select.utils';

type EditableTaskSelectEditorProps = {
  allowClear: boolean;
  ariaLabel: string;
  draft: string;
  error?: string | null;
  errorMessage: string;
  feedbackId: string;
  isLoading: boolean;
  isSaving: boolean;
  onCancel: () => void;
  onChange: (value: string) => void;
  onRetry?: () => void;
  options: EditableTaskSelectOption[];
  selectRef: RefObject<HTMLSelectElement | null>;
};

export function EditableTaskSelectEditor({
  allowClear,
  ariaLabel,
  draft,
  error,
  errorMessage,
  feedbackId,
  isLoading,
  isSaving,
  onCancel,
  onChange,
  onRetry,
  options,
  selectRef,
}: EditableTaskSelectEditorProps): ReactElement {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <div className="relative min-w-0">
        <select
          aria-label={ariaLabel}
          aria-describedby={error ? feedbackId : undefined}
          aria-invalid={Boolean(error) || undefined}
          autoFocus
          className="border-primary bg-primary-container-muted/60 text-text-primary h-(--control-height-xs) w-full min-w-0 appearance-none rounded-sm border-2 px-3 pr-8 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSaving || isLoading || Boolean(error)}
          onBlur={onCancel}
          onChange={(event) => onChange(event.target.value)}
          ref={selectRef}
          value={draft}
        >
          {allowClear ? (
            <option value="">
              {getEditableTaskSelectEmptyLabel(ariaLabel)}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {isLoading ? (
          <EditableFieldLoadingIndicator
            className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
            label="Loading options..."
          />
        ) : (
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
            <TaskDetailsChevronDownIcon />
          </span>
        )}
      </div>
      {error ? (
        <div className="flex flex-col items-start gap-1">
          <EditableValidationMessage id={feedbackId} message={errorMessage} />
          <button
            className="text-danger-text text-left text-xs underline"
            onMouseDown={(event) => event.preventDefault()}
            onClick={onRetry}
            type="button"
          >
            Try again
          </button>
        </div>
      ) : null}
    </div>
  );
}
