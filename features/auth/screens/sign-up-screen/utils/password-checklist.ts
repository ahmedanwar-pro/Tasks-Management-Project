import { passwordPolicy } from '@/features/auth/utils';

export type PasswordChecklistItem = {
  isValid: boolean;
  label: string;
};

export function getPasswordChecklist(value: string): PasswordChecklistItem[] {
  return [
    {
      isValid: passwordPolicy.hasMinimumLength(value),
      label: 'At least 8 characters',
    },
    {
      isValid:
        passwordPolicy.hasUppercase(value) &&
        passwordPolicy.hasLowercase(value) &&
        passwordPolicy.hasDigit(value),
      label: 'One uppercase, lowercase, and digit',
    },
    {
      isValid: passwordPolicy.hasSpecialCharacter(value),
      label: 'One special character',
    },
  ];
}
