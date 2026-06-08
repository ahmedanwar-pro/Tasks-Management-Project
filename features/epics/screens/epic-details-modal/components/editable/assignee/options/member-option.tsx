import type { ReactElement } from 'react';
import type { AssigneeOption } from '@/features/epics/screens/add-new-epic-screen/utils';

type EditableEpicAssigneeMemberOptionProps = {
  member: AssigneeOption;
};

export function EditableEpicAssigneeMemberOption({
  member,
}: EditableEpicAssigneeMemberOptionProps): ReactElement {
  return <option value={member.id}>{member.label}</option>;
}
