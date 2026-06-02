import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { FormField } from '@/components/forms';
import { Textarea } from '@/components/ui';

type EpicDescriptionFieldProps = {
  characterCount: number;
  error?: string;
  registration: UseFormRegisterReturn<'description'>;
};

export function EpicDescriptionField({
  characterCount,
  error,
  registration,
}: EpicDescriptionFieldProps): ReactElement {
  const hasError = Boolean(error);

  return (
    <FormField
      counter={`${characterCount} / 500 characters`}
      error={error}
      label="Description"
      labelClassName="text-[11px] leading-[16.5px] tracking-[1.1px]"
      layout="split"
      messageClassName="text-[11px] leading-[16.5px] tracking-[0.55px] lg:uppercase"
      optional
    >
      {({ inputId, descriptionId }) => (
        <Textarea
          {...registration}
          aria-describedby={descriptionId}
          aria-invalid={hasError || undefined}
          className="min-h-27 rounded-sm lg:min-h-30"
          id={inputId}
          maxLength={500}
          placeholder="Describe the scope and objectives of this epic..."
          size="sm"
        />
      )}
    </FormField>
  );
}
