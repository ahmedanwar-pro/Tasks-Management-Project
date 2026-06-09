import type {
  ChangeEvent,
  ClipboardEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  ReactElement,
} from 'react';
import { Textarea } from '@/components/ui';
import { epicDescriptionMaxLength } from '../utils';

type EditableEpicDescriptionTextareaProps = {
  describedBy?: string;
  disabled: boolean;
  invalid: boolean;
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
  onPaste: ClipboardEventHandler<HTMLTextAreaElement>;
  value: string;
};

export function EditableEpicDescriptionTextarea({
  describedBy,
  disabled,
  invalid,
  onBlur,
  onChange,
  onKeyDown,
  onPaste,
  value,
}: EditableEpicDescriptionTextareaProps): ReactElement {
  return (
    <Textarea
      aria-label="Epic description"
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      autoFocus
      className="min-h-27 rounded-sm md:min-h-30"
      disabled={disabled}
      invalid={invalid}
      maxLength={epicDescriptionMaxLength}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      placeholder="Describe the scope and objectives of this epic..."
      size="sm"
      value={value}
    />
  );
}
