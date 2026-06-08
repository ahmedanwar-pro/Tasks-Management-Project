import type { ReactElement } from 'react';

type EditableEpicAssigneeLoadingOptionProps = {
  value: string;
};

export function EditableEpicAssigneeLoadingOption({
  value,
}: EditableEpicAssigneeLoadingOptionProps): ReactElement {
  return <option value={value}>Loading members...</option>;
}
