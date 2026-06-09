import type { AssigneeOption } from '@/features/epics/screens/add-new-epic-screen/utils';

export function normalizeAssigneeId(
  assigneeId: string | null | undefined,
): string | null {
  const trimmedAssigneeId = assigneeId?.trim() ?? '';

  return trimmedAssigneeId || null;
}

export function getInferredAssigneeId({
  currentAssigneeId,
  members,
  personName,
}: {
  currentAssigneeId: string | null;
  members: AssigneeOption[];
  personName?: string;
}): string | null {
  return (
    currentAssigneeId ??
    members.find((member) => member.label === personName)?.id ??
    null
  );
}

export function getSelectValue({
  currentSelectValue,
  draftAssigneeId,
  effectiveCurrentSelectValue,
  isLoading,
}: {
  currentSelectValue: string;
  draftAssigneeId: string;
  effectiveCurrentSelectValue: string;
  isLoading: boolean;
}): string {
  return isLoading || draftAssigneeId !== currentSelectValue
    ? draftAssigneeId
    : effectiveCurrentSelectValue;
}
