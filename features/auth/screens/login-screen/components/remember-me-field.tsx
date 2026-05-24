import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type RememberMeFieldProps = {
  registration: UseFormRegisterReturn<'rememberMe'>;
};

export function RememberMeField({
  registration,
}: RememberMeFieldProps): ReactElement {
  return (
    <label className="text-body-sm leading-base text-text-secondary inline-flex w-fit cursor-pointer items-center gap-2">
      <input
        className="border-border-muted text-primary focus-visible:outline-primary bg-surface accent-primary size-4 shrink-0 cursor-pointer rounded-xs border focus-visible:outline-2 focus-visible:outline-offset-2"
        type="checkbox"
        {...registration}
      />
      <span>Remember Me</span>
    </label>
  );
}
