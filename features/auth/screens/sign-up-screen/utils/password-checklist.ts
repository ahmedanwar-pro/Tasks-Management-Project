const uppercasePattern = /[A-Z]/;
const lowercasePattern = /[a-z]/;
const digitPattern = /\d/;
const specialCharacterPattern = /[!@#$%^&*]/;

export type PasswordChecklistItem = {
  isValid: boolean;
  label: string;
};

export function getPasswordChecklist(value: string): PasswordChecklistItem[] {
  return [
    {
      isValid: value.length >= 8,
      label: 'At least 8 characters',
    },
    {
      isValid:
        uppercasePattern.test(value) &&
        lowercasePattern.test(value) &&
        digitPattern.test(value),
      label: 'One uppercase, lowercase, and digit',
    },
    {
      isValid: specialCharacterPattern.test(value),
      label: 'One special character',
    },
  ];
}
