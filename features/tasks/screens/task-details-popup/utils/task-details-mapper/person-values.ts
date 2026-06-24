import { getUserInitials } from '@/components/layout/utils/get-user-initials';
import type { TaskDetailsPersonInfo } from '../../task-details-popup.types';
import { getRecordText, getText } from './text-values';

function getPersonText(person: unknown, fallback?: unknown): string {
  if (typeof person === 'string') {
    return getText(person);
  }

  return (
    getRecordText(person, ['name', 'full_name', 'display_name', 'email']) ||
    getText(fallback)
  );
}

type MapPersonParams = {
  fallbackName?: unknown;
  person: unknown;
  role: string;
};

export function mapPerson({
  fallbackName,
  person,
  role,
}: MapPersonParams): TaskDetailsPersonInfo {
  const name = getPersonText(person, fallbackName) || 'Unassigned';

  return {
    initials: getUserInitials(name),
    name,
    role,
  };
}
