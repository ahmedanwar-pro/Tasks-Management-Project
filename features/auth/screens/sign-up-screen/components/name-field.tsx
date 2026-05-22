import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { AuthField } from '../../../components';

type NameFieldProps = {
  error?: string;
  registration: UseFormRegisterReturn<'name'>;
};

function NameLabel(): ReactElement {
  return (
    <>
      <span className="md:hidden">Full Name</span>
      <span className="hidden md:inline">Name</span>
    </>
  );
}

export function NameField({
  error,
  registration,
}: NameFieldProps): ReactElement {
  return (
    <AuthField
      autoComplete="name"
      error={error}
      hint="3-50 characters, letters only."
      label={<NameLabel />}
      placeholder="Enter your full name"
      required
      {...registration}
    />
  );
}
