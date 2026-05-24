'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { FormField } from '@/components/forms';
import { IconButton, Input } from '@/components/ui';
import { EyeIcon, EyeOffIcon } from '../../../components';

type ResetPasswordFieldProps = {
  disabled?: boolean;
  error?: string;
  label: string;
  registration: UseFormRegisterReturn<'newPassword' | 'confirmPassword'>;
  showVisibilityToggle?: boolean;
};

export function ResetPasswordField({
  disabled = false,
  error,
  label,
  registration,
  showVisibilityToggle = false,
}: ResetPasswordFieldProps): ReactElement {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = isPasswordVisible ? 'text' : 'password';

  return (
    <FormField
      error={error}
      label={label}
      labelClassName="text-text-tertiary text-[11px] leading-[16.5px] tracking-[0.55px] md:text-text-secondary"
      messageClassName="px-1 text-[11px] leading-[16.5px]"
    >
      {({ descriptionId, inputId }) => (
        <Input
          aria-describedby={descriptionId}
          autoComplete="new-password"
          className="border-border-strong bg-surface-low h-(--control-height-xl) rounded-xs px-4.25"
          disabled={disabled}
          fullWidth
          iconRight={
            showVisibilityToggle ? (
              <IconButton
                aria-label={`${isPasswordVisible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
                className="text-text-muted hover:text-text-primary size-6! rounded-xs! hover:bg-transparent active:bg-transparent"
                icon={isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                disabled={disabled}
                onClick={() =>
                  setIsPasswordVisible((currentValue) => !currentValue)
                }
                type="button"
                variant="ghost"
              />
            ) : undefined
          }
          iconRightAriaHidden={!showVisibilityToggle}
          id={inputId}
          inputClassName="placeholder:text-text-muted"
          invalid={Boolean(error)}
          placeholder="••••••••"
          radius="xs"
          size="md"
          type={inputType}
          variant="bordered"
          {...registration}
        />
      )}
    </FormField>
  );
}
