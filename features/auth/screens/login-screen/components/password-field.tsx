import { useState } from 'react';
import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { IconButton } from '@/components/ui';
import { AuthField, EyeIcon, EyeOffIcon } from '../../../components';

type PasswordFieldProps = {
  error?: string;
  registration: UseFormRegisterReturn<'password'>;
};

export function PasswordField({
  error,
  registration,
}: PasswordFieldProps): ReactElement {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = isPasswordVisible ? 'text' : 'password';

  return (
    <AuthField
      autoComplete="current-password"
      error={error}
      iconRight={
        <IconButton
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          className="text-text-muted hover:text-text-primary size-6! rounded-xs! hover:bg-transparent active:bg-transparent"
          icon={isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          onClick={() => setIsPasswordVisible((currentValue) => !currentValue)}
          type="button"
          variant="ghost"
        />
      }
      iconRightAriaHidden={false}
      label="Password"
      placeholder="Password"
      required
      type={inputType}
      {...registration}
    />
  );
}
