import type { ReactElement } from 'react';
import type { AssigneeOption } from '@/features/epics/screens/add-new-epic-screen/utils';
import {
  EditableEpicAssigneeCurrentOption,
  EditableEpicAssigneeErrorOption,
  EditableEpicAssigneeLoadingOption,
  EditableEpicAssigneeMemberOption,
  EditableEpicAssigneeUnassignedOption,
} from './options';

type EditableEpicAssigneeOptionsProps = {
  hasError: boolean;
  isLoading: boolean;
  members: AssigneeOption[];
  value: string;
};

export function EditableEpicAssigneeOptions({
  hasError,
  isLoading,
  members,
  value,
}: EditableEpicAssigneeOptionsProps): ReactElement {
  const hasSelectedValue =
    value === '' || members.some((member) => member.id === value);

  return (
    <>
      {isLoading ? <EditableEpicAssigneeLoadingOption value={value} /> : null}
      {!isLoading && !hasSelectedValue ? (
        <EditableEpicAssigneeCurrentOption value={value} />
      ) : null}
      {!isLoading ? <EditableEpicAssigneeUnassignedOption /> : null}
      {!isLoading && hasError ? (
        <EditableEpicAssigneeErrorOption value={value} />
      ) : null}
      {!isLoading && !hasError
        ? members.map((member, index) => (
            <EditableEpicAssigneeMemberOption
              key={`${member.id}-${index}`}
              member={member}
            />
          ))
        : null}
    </>
  );
}
