export const epicTitleMaxLength = 100;
export const epicTitleMinLength = 3;

export function getEpicTitleValidationMessage(title: string): string | null {
  const characterCount = Array.from(title).length;

  if (!title) {
    return 'Title is required.';
  }

  if (characterCount < epicTitleMinLength) {
    return 'Title must be at least 3 characters.';
  }

  if (characterCount > epicTitleMaxLength) {
    return 'Title must be 100 characters or fewer.';
  }

  return null;
}
