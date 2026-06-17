import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { CalendarIcon, CheckCircleIcon, WarningIcon } from '../icons';

type TaskCardMetaProps = {
  dueDateTime: string;
  isActiveProgressTask: boolean;
  isDelayed: boolean;
  isDone: boolean;
  isReadyForProductionTask: boolean;
  label: string;
};

export function TaskCardMeta({
  dueDateTime,
  isActiveProgressTask,
  isDelayed,
  isDone,
  isReadyForProductionTask,
  label,
}: TaskCardMetaProps): ReactElement {
  const MetaIcon = isDone
    ? CheckCircleIcon
    : isDelayed
      ? WarningIcon
      : CalendarIcon;

  return (
    <div
      className={joinClasses(
        'text-label-sm text-text-subtle leading-compact flex min-w-0 items-center gap-2 font-bold uppercase',
        isActiveProgressTask && '!text-primary',
        isReadyForProductionTask && '!text-success-icon',
        isDelayed && '!text-danger',
      )}
    >
      <MetaIcon />
      {dueDateTime && !isDelayed && !isDone ? (
        <time className="truncate" dateTime={dueDateTime}>
          {label}
        </time>
      ) : (
        <span className="truncate">{label}</span>
      )}
    </div>
  );
}
