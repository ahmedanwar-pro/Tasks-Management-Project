import type {
  ChangeEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  ReactElement,
} from 'react';
import { Input } from '@/components/ui';
import { epicTitleMaxLength, epicTitleMinLength } from '../utils';

type EditableEpicTitleInputProps = {
  describedBy?: string;
  disabled: boolean;
  invalid: boolean;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  value: string;
};

export function EditableEpicTitleInput({
  describedBy,
  disabled,
  invalid,
  onBlur,
  onChange,
  onKeyDown,
  value,
}: EditableEpicTitleInputProps): ReactElement {
  return (
    <Input
      aria-label="Epic title"
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      autoFocus
      className="h-auto min-w-0 border-transparent bg-transparent p-0 outline-offset-4 hover:bg-primary-container-muted/60 focus-within:bg-primary-container-muted"
      disabled={disabled}
      fullWidth
      invalid={invalid}
      inputClassName="text-title-lg text-text-primary md:text-headline-md md:leading-section leading-6.25 font-bold tracking-normal"
      maxLength={epicTitleMaxLength}
      minLength={epicTitleMinLength}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      required
      type="text"
      value={value}
    />
  );
}
