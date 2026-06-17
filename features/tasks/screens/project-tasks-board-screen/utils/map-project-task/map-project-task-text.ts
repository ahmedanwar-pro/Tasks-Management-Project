export function getText(value?: string | null): string {
  return value?.trim() ?? '';
}
