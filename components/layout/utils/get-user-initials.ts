export function getUserInitials(name: string): string {
  const names = name.trim().split(/\s+/).filter(Boolean);

  if (names.length > 1) {
    return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
  }

  return names[0]?.slice(0, 2).toUpperCase() ?? '';
}
