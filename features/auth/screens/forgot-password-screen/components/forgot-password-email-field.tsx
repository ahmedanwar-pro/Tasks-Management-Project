import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { FormField } from '@/components/forms';
import { Input } from '@/components/ui';

type ForgotPasswordEmailFieldProps = {
  disabled: boolean;
  error?: string;
  registration: UseFormRegisterReturn<'email'>;
};

export function ForgotPasswordEmailField({
  disabled,
  error,
  registration,
}: ForgotPasswordEmailFieldProps): ReactElement {
  return (
    <FormField
      className="gap-[5.5px] md:gap-2"
      controlClassName="gap-0"
      error={error}
      label="Email address"
      labelClassName={
        error
          ? 'px-1 text-[11px] leading-[16.5px] tracking-[0.55px] !text-danger md:px-0'
          : 'px-1 text-[11px] leading-[16.5px] tracking-[0.55px] text-text-secondary md:px-0'
      }
      messageClassName="px-1 text-[11px] leading-[16.5px] md:text-[11px] md:leading-[16.5px]"
    >
      {({ descriptionId, inputId }) => (
        <Input
          aria-describedby={descriptionId}
          autoComplete="email"
          className="bg-primary-container-muted md:border-border h-(--control-height-xl) rounded-xs border-transparent px-4 md:rounded-sm md:px-4.25"
          disabled={disabled}
          fullWidth
          id={inputId}
          inputClassName={
            error
              ? 'text-danger-text placeholder:text-danger-text'
              : 'placeholder:text-text-muted'
          }
          invalid={Boolean(error)}
          placeholder="Enter your email"
          radius="xs"
          size="md"
          type="email"
          {...registration}
        />
      )}
    </FormField>
  );
}
