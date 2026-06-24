type TextRecord = Record<string, unknown>;

function isTextRecord(value: unknown): value is TextRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function getText(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  return '';
}

export function getRecordText(
  value: unknown,
  fields: readonly string[],
): string {
  if (!isTextRecord(value)) {
    return '';
  }

  for (const field of fields) {
    const text = getText(value[field]);

    if (text) {
      return text;
    }
  }

  return '';
}
