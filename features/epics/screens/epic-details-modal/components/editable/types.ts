export type EditableStringSaveHandler = (value: string) => Promise<void>;

export type EditableNullableStringSaveHandler = (
  value: string | null,
) => Promise<void>;
