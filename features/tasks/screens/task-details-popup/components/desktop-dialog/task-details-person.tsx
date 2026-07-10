import type { ReactElement } from 'react';
import { Avatar } from '@/components/ui';
import type { TaskDetailsPersonInfo } from '../../task-details-popup.types';

type TaskDetailsPersonProps = {
  label: string;
  person: TaskDetailsPersonInfo;
};

export function TaskDetailsPerson({
  label,
  person,
}: TaskDetailsPersonProps): ReactElement {
  return (
    <article className="flex flex-col gap-3">
      <p className="text-label-sm text-text-secondary leading-compact font-bold tracking-[0.5px] uppercase">
        {label}
      </p>
      <div className="flex items-center gap-3">
        <Avatar
          className="bg-surface-highest text-text-primary rounded-lg shadow-none"
          initials={person.initials}
          name={person.name}
          size="md"
        />
        <div className="min-w-0">
          <p className="text-body-sm text-text-primary leading-base truncate font-medium">
            {person.name}
          </p>
        </div>
      </div>
    </article>
  );
}
