import type {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  ReactElement,
} from 'react';
import { Input } from '@/components/ui';
import { EditableFieldLoadingIndicator } from '../editable-field-loading-indicator';

type EditableEpicDeadlineInputProps = {
  disabled: boolean;
  isSaving: boolean;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  value: string;
};

export function EditableEpicDeadlineInput({
  disabled,
  isSaving,
  onBlur,
  onChange,
  onKeyDown,
  value,
}: EditableEpicDeadlineInputProps): ReactElement {
  return (
    <Input
      aria-label="Epic deadline"
      autoFocus
      className="h-(--control-height-xs) min-w-0 rounded-sm border-transparent bg-primary-container-muted px-3 max-sm:h-8 max-sm:max-w-[8.75rem] max-sm:px-1.5"
      disabled={disabled}
      fullWidth
      iconRight={
        isSaving ? <EditableFieldLoadingIndicator label="Saving..." /> : null
      }
      iconRightAriaHidden={false}
      inputClassName="text-body-sm leading-base text-text-primary max-sm:pr-1"
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      type="date"
      value={value}
    />
  );
}
