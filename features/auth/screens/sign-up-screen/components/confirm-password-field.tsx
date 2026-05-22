import { useState } from 'react';
import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { IconButton } from '@/components/ui';
import { EyeIcon, EyeOffIcon } from './sign-up-icons';
import { SignUpField } from './sign-up-field';

type ConfirmPasswordFieldProps = {
  error?: string;
  registration: UseFormRegisterReturn<'confirmPassword'>;
};

export function ConfirmPasswordField({
  error,
  registration,
}: ConfirmPasswordFieldProps): ReactElement {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = isPasswordVisible ? 'text' : 'password';

  return (
    <SignUpField
      autoComplete="new-password"
      error={error}
      iconRight={
        <IconButton
          aria-label={
            isPasswordVisible
              ? 'Hide confirm password'
              : 'Show confirm password'
          }
          className="text-text-muted hover:text-text-primary size-6! rounded-xs! hover:bg-transparent active:bg-transparent"
          icon={isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          onClick={() => setIsPasswordVisible((currentValue) => !currentValue)}
          type="button"
          variant="ghost"
        />
      }
      iconRightAriaHidden={false}
      label="Confirm Password"
      placeholder="Repeat your password"
      required
      type={inputType}
      {...registration}
    />
  );
}
