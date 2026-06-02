import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { FormField } from '@/components/forms';
import { Input } from '@/components/ui';

type EpicTitleFieldProps = {
  error?: string;
  registration: UseFormRegisterReturn<'title'>;
};

export function EpicTitleField({
  error,
  registration,
}: EpicTitleFieldProps): ReactElement {
  const hasError = Boolean(error);

  return (
    <FormField
      error={error}
      label="Title"
      labelClassName="text-[11px] leading-[16.5px] tracking-[1.1px]"
      layout="split"
      messageClassName="text-[11px] leading-[16.5px] tracking-[0.55px] lg:uppercase"
      required
    >
      {({ inputId, descriptionId }) => (
        <Input
          {...registration}
          aria-describedby={descriptionId}
          aria-invalid={hasError || undefined}
          autoComplete="off"
          className="h-(--control-height-xl) rounded-sm"
          fullWidth
          id={inputId}
          maxLength={100}
          placeholder="e.g. Structural Foundation Phase"
          size="md"
          type="text"
        />
      )}
    </FormField>
  );
}
