import type {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  Ref,
} from 'react';
import { SelectChevron } from '@/features/epics/screens/add-new-epic-screen/components';
import type { AssigneeOption } from '@/features/epics/screens/add-new-epic-screen/utils';
import { EditableFieldLoadingIndicator } from '../editable-field-loading-indicator';
import { EditableEpicAssigneeOptions } from './assignee-options';

type EditableEpicAssigneeSelectProps = {
  disabled: boolean;
  hasError: boolean;
  isLoading: boolean;
  members: AssigneeOption[];
  onBlur: FocusEventHandler<HTMLSelectElement>;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  onKeyUp: KeyboardEventHandler<HTMLSelectElement>;
  onMouseUp: MouseEventHandler<HTMLSelectElement>;
  ref?: Ref<HTMLSelectElement>;
  value: string;
};

export function EditableEpicAssigneeSelect({
  disabled,
  hasError,
  isLoading,
  members,
  onBlur,
  onChange,
  onKeyUp,
  onMouseUp,
  ref,
  value,
}: EditableEpicAssigneeSelectProps): ReactElement {
  return (
    <div className="relative w-full">
      <select
        aria-label="Epic assignee"
        aria-invalid={hasError || undefined}
        autoFocus
        className="h-(--control-height-xs) w-full appearance-none rounded-sm border border-transparent bg-primary-container-muted px-3 pr-8 text-body-sm leading-base text-text-primary outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
        disabled={disabled || isLoading}
        onBlur={onBlur}
        onChange={onChange}
        onKeyUp={onKeyUp}
        onMouseUp={onMouseUp}
        ref={ref}
        value={value}
      >
        <EditableEpicAssigneeOptions
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
  );
}
