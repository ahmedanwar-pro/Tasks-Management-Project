import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { FormField } from '@/components/forms';
import { Input } from '@/components/ui';

type TaskDueDateFieldProps = {
  disabled?: boolean;
  error?: string;
  registration: UseFormRegisterReturn;
};

export function TaskDueDateField({
  disabled = false,
  error,
  registration,
}: TaskDueDateFieldProps): ReactElement {
  return (
    <FormField
      className="gap-2"
      error={error}
      label="Due Date"
      labelClassName="text-text-primary lg:text-text-secondary text-[11px] leading-[16.5px] tracking-[0.55px]"
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
          size="md"
          type="date"
        />
      )}
    </FormField>
  );
}
