export const epicDeadlinePastDateMessage =
  'Deadline must be today or a future date.';

export function getTodayDateInputValue(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function isEpicDeadlineTodayOrFuture(value: string): boolean {
  return !value || value >= getTodayDateInputValue();
}
