import type { ReactElement } from 'react';
import { Avatar } from '@/components/ui';
import type { TaskDetailsPersonInfo } from '../../task-details-popup.types';

type TaskDetailsMobilePersonCardProps = {
  label: string;
  person: TaskDetailsPersonInfo;
  tone: 'primary' | 'muted';
};

export function TaskDetailsMobilePersonCard({
  label,
  person,
  tone,
}: TaskDetailsMobilePersonCardProps): ReactElement {
  return (
    <article className="bg-surface-low flex h-20 flex-col gap-1 rounded-md p-4">
      <p className="text-text-muted text-[11px] leading-[16.5px] font-bold uppercase">
        {label}
      </p>
      <div className="flex items-center gap-2 pt-1">
        <Avatar
          className={
            tone === 'primary'
              ? 'bg-surface-highest text-primary rounded-xl shadow-none'
              : 'bg-surface-highest text-text-tertiary rounded-xl shadow-none'
          }
          initials={person.initials}
          name={person.name}
          size="sm"
        />
        <p className="text-body-sm text-text-primary leading-base truncate font-medium">
          {person.name}
        </p>
      </div>
    </article>
  );
}
