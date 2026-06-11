import type { ReactElement } from 'react';
import { projectMembersFetchErrorMessage } from '@/features/epics/screens/shared/utils';

type EditableEpicAssigneeErrorOptionProps = {
  value: string;
};

export function EditableEpicAssigneeErrorOption({
  value,
}: EditableEpicAssigneeErrorOptionProps): ReactElement {
  return <option value={value}>{projectMembersFetchErrorMessage}</option>;
}
