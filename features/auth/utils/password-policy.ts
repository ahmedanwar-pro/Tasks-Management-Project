import { z } from 'zod';

const minimumLength = 8;
const maximumLength = 64;
const digitPattern = /\d/;
const lowercasePattern = /[a-z]/;
const specialCharacterPattern = /[!@#$%^&*]/;
const uppercasePattern = /[A-Z]/;
const whitespacePattern = /\s/;

type PasswordValidationMessages = {
  required: string;
  minimumLength: string;
  maximumLength: string;
  whitespace: string;
  uppercase: string;
  lowercase: string;
  digit: string;
  specialCharacter: string;
};

export const passwordPolicy = {
  hasDigit: (value: string) => digitPattern.test(value),
  hasLowercase: (value: string) => lowercasePattern.test(value),
  hasMinimumLength: (value: string) => value.length >= minimumLength,
  hasSpecialCharacter: (value: string) => specialCharacterPattern.test(value),
  hasUppercase: (value: string) => uppercasePattern.test(value),
  hasValidLength: (value: string) =>
    value.length >= minimumLength && value.length <= maximumLength,
  hasWhitespace: (value: string) => whitespacePattern.test(value),
};

export function createPasswordSchema(messages: PasswordValidationMessages) {
  return z
    .string()
    .min(1, messages.required)
    .min(minimumLength, messages.minimumLength)
    .max(maximumLength, messages.maximumLength)
    .refine(
      (value) => !passwordPolicy.hasWhitespace(value),
      messages.whitespace,
    )
    .refine(passwordPolicy.hasUppercase, messages.uppercase)
    .refine(passwordPolicy.hasLowercase, messages.lowercase)
    .refine(passwordPolicy.hasDigit, messages.digit)
    .refine(passwordPolicy.hasSpecialCharacter, messages.specialCharacter);
}
