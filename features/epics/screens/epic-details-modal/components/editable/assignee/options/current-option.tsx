import type { ReactElement } from 'react';

type EditableEpicAssigneeCurrentOptionProps = {
  value: string;
};

export function EditableEpicAssigneeCurrentOption({
  value,
}: EditableEpicAssigneeCurrentOptionProps): ReactElement {
  return <option value={value}>Current assignee</option>;
}
