import type {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  ReactElement,
  Ref,
} from 'react';
import { useId } from 'react';
import { projectMembersFetchErrorMessage } from '@/features/epics/screens/shared/utils';
import { SelectChevron } from '@/features/epics/screens/add-new-epic-screen/components';
import type { AssigneeOption } from '@/features/epics/screens/add-new-epic-screen/utils';
import { EditableValidationMessage } from '../editable-validation-message';
import { EditableFieldLoadingIndicator } from '../editable-field-loading-indicator';
import { EditableEpicAssigneeOptions } from './assignee-options';

type EditableEpicAssigneeSelectProps = {
  currentAssigneeLabel?: string;
  disabled: boolean;
  hasError: boolean;
  isLoading: boolean;
  members: AssigneeOption[];
  onBlur: FocusEventHandler<HTMLSelectElement>;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  onKeyUp: KeyboardEventHandler<HTMLSelectElement>;
  onMouseUp: MouseEventHandler<HTMLSelectElement>;
  onPointerDown: PointerEventHandler<HTMLSelectElement>;
  ref?: Ref<HTMLSelectElement>;
  value: string;
};

export function EditableEpicAssigneeSelect({
  currentAssigneeLabel,
  disabled,
  hasError,
  isLoading,
  members,
  onBlur,
  onChange,
  onKeyUp,
  onMouseUp,
  onPointerDown,
  ref,
  value,
}: EditableEpicAssigneeSelectProps): ReactElement {
  const errorMessageId = useId();

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative w-full">
        <select
          aria-label="Epic assignee"
          aria-describedby={hasError ? errorMessageId : undefined}
          aria-invalid={hasError || undefined}
          autoFocus
          className="h-(--control-height-xs) w-full appearance-none rounded-sm border border-transparent bg-primary-container-muted px-3 pr-8 text-body-sm leading-base text-text-primary outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
          disabled={disabled || isLoading}
          onBlur={onBlur}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onMouseUp={onMouseUp}
          onPointerDown={onPointerDown}
          ref={ref}
          value={value}
        >
          <EditableEpicAssigneeOptions
            currentAssigneeLabel={currentAssigneeLabel}
            hasError={hasError}
            isLoading={isLoading}
            members={members}
            value={value}
          />
        </select>
        {isLoading ? (
          <EditableFieldLoadingIndicator
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
            label="Loading members..."
          />
        ) : (
          <SelectChevron />
        )}
      </div>
      {hasError ? (
        <EditableValidationMessage
          id={errorMessageId}
          message={projectMembersFetchErrorMessage}
        />
      ) : null}
    </div>
  );
}
