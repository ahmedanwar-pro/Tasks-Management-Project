import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { AuthField } from './auth-field';

type EmailFieldProps = {
  error?: string;
  registration: UseFormRegisterReturn<'email'>;
};

export function EmailField({
  error,
  registration,
}: EmailFieldProps): ReactElement {
  return (
    <AuthField
      autoComplete="email"
      error={error}
      label="Email"
      placeholder="yourname@company.com"
      required
      type="email"
      {...registration}
    />
  );
}
