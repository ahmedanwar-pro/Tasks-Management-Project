import type {
  ChangeEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  ReactElement,
} from 'react';
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
    <input
      aria-label="Epic title"
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      autoFocus
      className="border-primary bg-primary-container-muted/60 text-title-lg text-text-primary md:text-headline-md md:leading-section focus:border-primary focus:bg-primary-container-muted/60 h-auto w-full min-w-0 appearance-none rounded-sm border-2 px-2 py-0.5 font-sans leading-6.25 font-bold tracking-normal transition-colors outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      disabled={disabled}
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
