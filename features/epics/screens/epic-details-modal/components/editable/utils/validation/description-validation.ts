export const epicDescriptionMaxLength = 500;
export const epicDescriptionMaxLengthMessage =
  'Description must be 500 characters or fewer.';

export function getEpicDescriptionValidationMessage(
  description: string,
): string | null {
  if (Array.from(description).length > epicDescriptionMaxLength) {
    return epicDescriptionMaxLengthMessage;
  }

  return null;
}
