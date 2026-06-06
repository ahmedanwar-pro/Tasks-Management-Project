export type ProjectEpicPersonLike = {
  name?: string | null;
  full_name?: string | null;
  display_name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
} | null;

export function getText(value?: string | null): string {
  return value?.trim() ?? '';
}

export function getPersonName(person?: ProjectEpicPersonLike): string {
  return (
    getText(person?.name) ||
    getText(person?.full_name) ||
    getText(person?.display_name) ||
    getText(person?.email)
  );
}

export function getPersonAvatarUrl(person?: ProjectEpicPersonLike): string {
  return getText(person?.avatar_url);
}
