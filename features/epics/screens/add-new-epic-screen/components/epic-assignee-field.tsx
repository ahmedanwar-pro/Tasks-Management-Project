import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { FormField } from '@/components/forms';
import { projectMembersFetchErrorMessage } from '../../shared/utils';
import { useEpicAssigneeDropdown } from '../hooks';
import { LoadingSpinner, SelectChevron } from './epic-assignee-field-icons';

type EpicAssigneeFieldProps = {
  projectId: string;
  registration: UseFormRegisterReturn<'assigneeId'>;
};

export function EpicAssigneeField({
  projectId,
  registration,
}: EpicAssigneeFieldProps): ReactElement {
  const {
    members,
    isDisabled,
    isMembersLoading,
    hasError,
    placeholder,
    setSelectRef,
    handleLoadMembers,
    handlePointerDown,
  } = useEpicAssigneeDropdown({
    projectId,
    registerSelectRef: registration.ref,
  });

  return (
    <FormField
      className="gap-2 lg:gap-4"
      error={hasError ? projectMembersFetchErrorMessage : undefined}
      label="Assignee"
      labelClassName="text-[11px] leading-[16.5px] tracking-[1.1px]"
      messageClassName="text-[11px] leading-[16.5px] tracking-[0.55px]"
    >
      {({ inputId, descriptionId }) => (
        <div className="relative w-full">
          <select
            {...registration}
            aria-describedby={descriptionId}
            aria-invalid={hasError || undefined}
            className="bg-primary-container-muted text-text-primary focus-visible:outline-primary text-body-md h-(--control-height-xl) w-full appearance-none rounded-sm border border-transparent px-4 pr-10 leading-relaxed transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isDisabled}
            id={inputId}
            onFocus={handleLoadMembers}
            onPointerDown={handlePointerDown}
            ref={setSelectRef}
          >
            <option value="">{placeholder}</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.label}
              </option>
            ))}
          </select>
          {isMembersLoading ? <LoadingSpinner /> : <SelectChevron />}
        </div>
      )}
    </FormField>
  );
}
