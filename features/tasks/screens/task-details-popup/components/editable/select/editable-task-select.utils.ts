import { projectMembersFetchErrorMessage } from '@/features/epics/screens/shared/utils';
import type { EditableTaskSelectOption } from './editable-task-select';

export function getEditableTaskSelectEmptyLabel(ariaLabel: string): string {
  return ariaLabel === 'Task assignee' ? 'Unassigned' : 'No epic';
}

export function getEditableTaskSelectErrorMessage(ariaLabel: string): string {
  return ariaLabel === 'Task assignee'
    ? projectMembersFetchErrorMessage
    : 'Could not load project epics.';
}

export function getEditableTaskSelectNextLabel({
  ariaLabel,
  currentLabel,
  nextValue,
  options,
}: {
  ariaLabel: string;
  currentLabel: string;
  nextValue: string;
  options: EditableTaskSelectOption[];
}): string {
  if (!nextValue) {
    return getEditableTaskSelectEmptyLabel(ariaLabel);
  }

  return (
    options.find((option) => option.value === nextValue)?.label ?? currentLabel
  );
}
