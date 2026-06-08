import type { ReactElement } from 'react';

type EditableEpicAssigneeErrorOptionProps = {
  value: string;
};

export function EditableEpicAssigneeErrorOption({
  value,
}: EditableEpicAssigneeErrorOptionProps): ReactElement {
  return <option value={value}>Could not load members</option>;
}
