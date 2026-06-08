import type {
  ChangeEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  ReactElement,
} from 'react';
import { Input } from '@/components/ui';

type EditableEpicTitleInputProps = {
  disabled: boolean;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  value: string;
};

export function EditableEpicTitleInput({
  disabled,
  onBlur,
  onChange,
  onKeyDown,
  value,
}: EditableEpicTitleInputProps): ReactElement {
  return (
    <Input
      aria-label="Epic title"
      autoFocus
      className="h-auto min-w-0 border-transparent bg-transparent p-0 outline-offset-4 hover:bg-primary-container-muted/60 focus-within:bg-primary-container-muted"
      disabled={disabled}
      fullWidth
      inputClassName="text-title-lg text-text-primary md:text-headline-md md:leading-section leading-6.25 font-bold tracking-normal"
      maxLength={100}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      required
      type="text"
      value={value}
    />
  );
}
