import { passwordPolicy } from '@/features/auth/utils';

export type PasswordRequirement = {
  isValid: boolean;
  label: string;
};

export function getMobilePasswordRequirements(
  value: string,
): PasswordRequirement[] {
  return [
    {
      isValid: passwordPolicy.hasValidLength(value),
      label: '8 - 64 characters',
    },
    {
      isValid:
        passwordPolicy.hasUppercase(value) &&
        passwordPolicy.hasLowercase(value),
      label: 'Uppercase & Lowercase',
    },
    {
      isValid: passwordPolicy.hasDigit(value),
      label: 'At least one digit',
    },
    {
      isValid: passwordPolicy.hasSpecialCharacter(value),
      label: 'Special character (e.g. !@#$)',
    },
  ];
}

export function getDesktopPasswordRequirements(
  value: string,
): PasswordRequirement[] {
  return [
    {
      isValid: passwordPolicy.hasValidLength(value),
      label: '8-64 characters',
    },
    {
      isValid: passwordPolicy.hasUppercase(value),
      label: 'Uppercase letter',
    },
    {
      isValid: passwordPolicy.hasLowercase(value),
      label: 'Lowercase letter',
    },
    {
      isValid: passwordPolicy.hasDigit(value),
      label: 'One digit',
    },
    {
      isValid: passwordPolicy.hasSpecialCharacter(value),
      label: 'Special character',
    },
  ];
}
