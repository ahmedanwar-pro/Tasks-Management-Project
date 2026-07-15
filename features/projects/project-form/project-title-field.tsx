import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { FormField } from '@/components/forms';
import { Input } from '@/components/ui';

type ProjectTitleFieldProps = {
  error?: string;
  registration: UseFormRegisterReturn<'name'>;
};

export function ProjectTitleField({
  error,
  registration,
}: ProjectTitleFieldProps): ReactElement {
  const hasError = Boolean(error);

  return (
    <FormField
      error={error}
      label="Project Title"
      labelClassName="text-[11px] leading-[16.5px] tracking-[0.55px] text-text-tertiary"
      messageClassName="text-danger gap-1.5 text-[12px] leading-tight lg:gap-1.5"
      required
    >
      {({ inputId, descriptionId }) => (
        <Input
          {...registration}
          aria-describedby={descriptionId}
          aria-invalid={hasError || undefined}
          autoComplete="off"
          className="h-(--control-height-2xl) px-4 lg:h-(--control-height-xl)"
          fullWidth
          id={inputId}
          maxLength={100}
          placeholder="Enter project title"
          radius="md"
          required
          size="lg"
          type="text"
          variant="bordered"
        />
      )}
    </FormField>
  );
}
