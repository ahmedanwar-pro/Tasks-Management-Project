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

function getPersonJobTitle(person: unknown, fallback?: unknown): string {
  return (
    getRecordText(person, ['job_title', 'jobTitle', 'department', 'position']) ||
    getText(fallback)
  );
}

type MapPersonParams = {
  fallbackName?: unknown;
  fallbackJobTitle?: unknown;
  person: unknown;
  role: string;
};

export function mapPerson({
  fallbackName,
  fallbackJobTitle,
  person,
  role,
}: MapPersonParams): TaskDetailsPersonInfo {
  const name = getPersonText(person, fallbackName) || 'Unassigned';
  const jobTitle = getPersonJobTitle(person, fallbackJobTitle);

  return {
    initials: getUserInitials(name),
    ...(jobTitle ? { jobTitle } : {}),
    name,
    role,
  };
}
