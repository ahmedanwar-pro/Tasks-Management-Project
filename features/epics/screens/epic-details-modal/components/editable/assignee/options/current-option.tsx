import type { ReactElement } from 'react';

type EditableEpicAssigneeCurrentOptionProps = {
  label?: string;
  value: string;
};

export function EditableEpicAssigneeCurrentOption({
  label = 'Current assignee',
  value,
}: EditableEpicAssigneeCurrentOptionProps): ReactElement {
  return <option value={value}>{label}</option>;
}
