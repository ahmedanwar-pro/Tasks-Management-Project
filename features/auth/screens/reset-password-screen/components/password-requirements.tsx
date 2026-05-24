import type { ReactElement } from 'react';
import {
  CompletedRequirementIcon,
  PendingRequirementIcon,
} from './reset-password-icons';
import {
  getDesktopPasswordRequirements,
  getMobilePasswordRequirements,
} from '../utils';

type RequirementItemProps = {
  isValid: boolean;
  label: string;
};

function RequirementItem({
  isValid,
  label,
}: RequirementItemProps): ReactElement {
  return (
    <li
      className={
        isValid
          ? 'text-text-primary flex items-center gap-2 text-[13px] leading-[19.5px]'
          : 'text-text-tertiary flex items-center gap-2 text-[13px] leading-[19.5px] opacity-70'
      }
    >
      {isValid ? <CompletedRequirementIcon /> : <PendingRequirementIcon />}
      <span>{label}</span>
    </li>
  );
}

type PasswordRequirementsProps = {
  passwordValue: string;
};

export function PasswordRequirements({
  passwordValue,
}: PasswordRequirementsProps): ReactElement {
  const mobileRequirements = getMobilePasswordRequirements(passwordValue);
  const desktopRequirements = getDesktopPasswordRequirements(passwordValue);

  return (
    <aside
      aria-labelledby="reset-password-requirements-title"
      className="bg-surface-low md:border-border-subtle md:bg-surface-low/50 flex w-full flex-col gap-3 rounded-sm p-5 md:gap-4 md:border md:p-5.25"
    >
      <h2
        className="text-text-tertiary border-border-subtle pb-1 text-[11px] leading-[16.5px] font-bold tracking-[0.55px] uppercase md:border-b md:pb-2.25"
        id="reset-password-requirements-title"
      >
        Security Requirements
      </h2>

      <ul className="flex flex-col gap-2.5 md:hidden">
        {mobileRequirements.map((requirement) => (
          <RequirementItem key={requirement.label} {...requirement} />
        ))}
      </ul>

      <ul className="hidden grid-cols-2 gap-x-3 gap-y-3 md:grid">
        {desktopRequirements.map((requirement) => (
          <RequirementItem key={requirement.label} {...requirement} />
        ))}
      </ul>
    </aside>
  );
}
