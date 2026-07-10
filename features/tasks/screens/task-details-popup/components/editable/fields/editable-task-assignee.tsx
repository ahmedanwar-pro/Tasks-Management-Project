'use client';

import { useState, type ReactElement } from 'react';
import { Avatar } from '@/components/ui';
import { useProjectMembersQuery } from '@/features/members/screens/project-members-list-screen/hooks';
import { mapTaskAssigneeOption } from '@/features/tasks/screens/add-new-task-screen/utils';
import type { TaskDetailsPersonInfo } from '../../../task-details-popup.types';
import { EditableTaskSelect } from '../select/editable-task-select';

type EditableTaskAssigneeProps = {
  assigneeId: string | null;
  className?: string;
  isSaving: boolean;
  onSave: (assigneeId: string | null) => Promise<void>;
  person: TaskDetailsPersonInfo;
  projectId: string;
  variant: 'desktop' | 'mobile' | 'tablet';
};

export function EditableTaskAssignee({
  assigneeId,
  className,
  isSaving,
  onSave,
  person,
  projectId,
  variant,
}: EditableTaskAssigneeProps): ReactElement {
  const [shouldLoadMembers, setShouldLoadMembers] = useState(false);
  const { data, error, isPending, refetch } = useProjectMembersQuery(
    projectId,
    shouldLoadMembers,
  );
  const options = (data?.members ?? [])
    .map(mapTaskAssigneeOption)
    .map((option) => ({
      label: option.label,
      value: option.id,
    }));
  const showJobTitle = variant === 'desktop' && Boolean(person.jobTitle);

  return (
    <EditableTaskSelect
      allowClear
      ariaLabel="Task assignee"
      className={className}
      currentLabel={person.name}
      currentValue={assigneeId}
      error={error?.message}
      hoverClassName="enabled:hover:bg-primary-container-muted/35"
      isLoading={shouldLoadMembers && isPending}
      isSaving={isSaving}
      onRetry={() => void refetch()}
      onSave={onSave}
      onStartEditing={() => setShouldLoadMembers(true)}
      options={options}
      viewContent={
        <span
          className={`flex min-w-0 items-center ${variant === 'mobile' ? 'gap-2' : 'gap-3'}`}
        >
          <Avatar
            className={`bg-surface-highest shadow-none ${variant === 'mobile' ? 'text-primary rounded-xl' : 'text-text-primary rounded-lg'}`}
            initials={person.initials}
            name={person.name}
            size={variant === 'mobile' ? 'sm' : 'md'}
          />
          <span className="min-w-0">
            <span
              className={`text-body-sm text-text-primary leading-base block truncate ${variant === 'mobile' ? 'font-medium' : 'font-semibold'}`}
            >
              {person.name}
            </span>
            {showJobTitle ? (
              <span className="text-label-sm text-text-secondary leading-compact block truncate">
                {person.jobTitle}
              </span>
            ) : null}
          </span>
        </span>
      }
    />
  );
}
