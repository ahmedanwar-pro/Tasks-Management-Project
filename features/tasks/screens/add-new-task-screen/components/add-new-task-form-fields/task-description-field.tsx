import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { FormField } from '@/components/forms';
import { Textarea } from '@/components/ui';

type TaskDescriptionFieldProps = {
  disabled?: boolean;
  error?: string;
  registration: UseFormRegisterReturn;
};

export function TaskDescriptionField({
  disabled = false,
  error,
  registration,
}: TaskDescriptionFieldProps): ReactElement {
  return (
    <FormField
      className="gap-2"
      error={error}
      label="Description"
      labelClassName="text-[11px] leading-[16.5px] tracking-[0.55px] lg:text-text-secondary"
      size="lg"
    >
      {({ inputId, descriptionId }) => (
        <Textarea
          {...registration}
          aria-describedby={descriptionId}
          disabled={disabled}
          id={inputId}
          invalid={Boolean(error)}
          placeholder="Provide detailed context for this task..."
          size="md"
        />
      )}
    </FormField>
  );
}
