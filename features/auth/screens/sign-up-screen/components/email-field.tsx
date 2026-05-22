import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { SignUpField } from './sign-up-field';

type EmailFieldProps = {
  error?: string;
  registration: UseFormRegisterReturn<'email'>;
};

export function EmailField({
  error,
  registration,
}: EmailFieldProps): ReactElement {
  return (
    <SignUpField
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
