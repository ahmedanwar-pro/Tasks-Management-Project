import type { ReactElement } from 'react';
import { HintStatusIcon } from './sign-up-icons';
import { getPasswordChecklist } from '../utils';

type PasswordHintsProps = {
  passwordValue: string;
};

export function PasswordHints({
  passwordValue,
}: PasswordHintsProps): ReactElement {
  const hints = getPasswordChecklist(passwordValue);

  return (
    <div className="bg-surface-muted hidden w-full flex-col gap-[7.5px] rounded-md p-4 md:flex">
      {hints.map((hint) => (
        <p
          className="text-text-secondary flex items-center gap-2 text-[11px] leading-[16.5px]"
          key={hint.label}
        >
          <HintStatusIcon checked={hint.isValid} />
          <span>{hint.label}</span>
        </p>
      ))}
    </div>
  );
}
