import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { FormField } from '@/components/forms';
import { Input } from '@/components/ui';

type TaskTitleFieldProps = {
  disabled?: boolean;
  error?: string;
  registration: UseFormRegisterReturn;
};

export function TaskTitleField({
  disabled = false,
  error,
  registration,
}: TaskTitleFieldProps): ReactElement {
  return (
    <FormField
      className="gap-2"
      error={error}
      label="Title"
      labelClassName="text-[11px] leading-[16.5px] tracking-[0.55px] lg:text-text-secondary"
      required
      size="lg"
    >
      {({ inputId, descriptionId }) => (
        <Input
          {...registration}
          aria-describedby={descriptionId}
          disabled={disabled}
          fullWidth
          id={inputId}
          invalid={Boolean(error)}
          placeholder="e.g., Finalize structural schematics"
          size="md"
        />
      )}
    </FormField>
  );
}
