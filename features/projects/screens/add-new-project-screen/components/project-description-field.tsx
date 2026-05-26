import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { FormField } from '@/components/forms';
import { Textarea } from '@/components/ui';

type ProjectDescriptionFieldProps = {
  characterCount: number;
  error?: string;
  registration: UseFormRegisterReturn<'description'>;
};

export function ProjectDescriptionField({
  characterCount,
  error,
  registration,
}: ProjectDescriptionFieldProps): ReactElement {
  const hasError = Boolean(error);

  return (
    <FormField
      counter={
        <>
          {characterCount} / 500
          <span className="hidden lg:inline"> characters</span>
        </>
      }
      error={error}
      label={
        <>
          <span>Description</span>
          <span className="text-text-muted hidden font-normal tracking-normal normal-case lg:inline">
            Optional
          </span>
        </>
      }
      labelClassName="flex w-full justify-between text-[11px] leading-[16.5px] tracking-[0.55px] text-text-tertiary"
      messageClassName="text-danger text-[12px] leading-tight"
    >
      {({ inputId, descriptionId }) => (
        <Textarea
          {...registration}
          aria-describedby={descriptionId}
          aria-invalid={hasError || undefined}
          className="lg:px-4-5 min-h-38 rounded-md px-4 py-4 lg:min-h-30 lg:rounded-sm lg:py-[14px]"
          id={inputId}
          maxLength={500}
          placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
          radius="md"
          size="sm"
        />
      )}
    </FormField>
  );
}
