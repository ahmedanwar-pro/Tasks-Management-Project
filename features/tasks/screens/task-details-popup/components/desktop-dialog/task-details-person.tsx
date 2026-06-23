import type { ReactElement } from 'react';
import { Avatar } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';
import type { TaskDetailsPersonInfo } from '../../task-details-popup.types';

type TaskDetailsPersonProps = {
  label: string;
  person: TaskDetailsPersonInfo;
  variant?: 'plain' | 'card';
};

export function TaskDetailsPerson({
  label,
  person,
  variant = 'plain',
}: TaskDetailsPersonProps): ReactElement {
  const isCard = variant === 'card';

  return (
    <article className="flex flex-col gap-3">
      <p className="text-label-sm text-text-secondary leading-compact font-bold tracking-[0.5px] uppercase">
        {label}
      </p>
      <div
        className={joinClasses(
          'flex items-center gap-3',
          isCard && 'bg-surface rounded-md p-2 shadow-sm',
        )}
      >
        <Avatar
          className="bg-surface-highest text-text-primary rounded-lg shadow-none"
          initials={person.initials}
          name={person.name}
          size="md"
        />
        <div className="min-w-0">
          <p
            className={joinClasses(
              'text-body-sm text-text-primary leading-base truncate',
              isCard ? 'font-semibold' : 'font-medium',
            )}
          >
            {person.name}
          </p>
          {isCard ? (
            <p className="text-label-sm text-text-secondary leading-compact truncate">
              {person.role}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
