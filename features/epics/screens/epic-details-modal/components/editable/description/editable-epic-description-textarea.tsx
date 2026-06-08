import type {
  ChangeEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  ReactElement,
} from 'react';
import { Textarea } from '@/components/ui';

type EditableEpicDescriptionTextareaProps = {
  disabled: boolean;
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
  value: string;
};

export function EditableEpicDescriptionTextarea({
  disabled,
  onBlur,
  onChange,
  onKeyDown,
  value,
}: EditableEpicDescriptionTextareaProps): ReactElement {
  return (
    <Textarea
      aria-label="Epic description"
      autoFocus
      className="min-h-27 rounded-sm md:min-h-30"
      disabled={disabled}
      maxLength={500}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Describe the scope and objectives of this epic..."
      size="sm"
      value={value}
    />
  );
}
