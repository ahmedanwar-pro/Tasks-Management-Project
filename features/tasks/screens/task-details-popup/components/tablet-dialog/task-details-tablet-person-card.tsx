import type { ReactElement } from 'react';
import { Avatar } from '@/components/ui';
import type { TaskDetailsPersonInfo } from '../../task-details-popup.types';

type TaskDetailsTabletPersonCardProps = {
  label: string;
  person: TaskDetailsPersonInfo;
};

export function TaskDetailsTabletPersonCard({
  label,
  person,
}: TaskDetailsTabletPersonCardProps): ReactElement {
  return (
    <article className="bg-surface-low flex min-h-[92px] flex-col gap-3 rounded-md p-4">
      <p className="text-label-sm leading-compact text-text-muted font-bold tracking-normal uppercase">
        {label}
      </p>
      <div className="flex min-w-0 items-center gap-3">
        <Avatar
          className="bg-surface-highest text-primary rounded-lg shadow-none"
          initials={person.initials}
          name={person.name}
          size="md"
        />
        <div className="min-w-0">
          <p className="text-body-sm leading-base text-text-primary truncate font-semibold">
            {person.name}
          </p>
        </div>
      </div>
    </article>
  );
}
