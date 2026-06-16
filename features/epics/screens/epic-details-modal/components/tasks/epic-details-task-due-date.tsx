import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { CalendarIcon, OverdueIcon } from '../icons/epic-details-modal-icons';

type EpicDetailsTaskDueDateProps = {
  dateTime: string;
  isOverdue?: boolean;
  label: string;
  variant?: 'desktop' | 'card';
};

export function EpicDetailsTaskDueDate({
  dateTime,
  isOverdue = false,
  label,
  variant = 'card',
}: EpicDetailsTaskDueDateProps): ReactElement {
  if (variant === 'desktop') {
    return (
      <div className="flex shrink-0 flex-col items-end">
        <span className="text-text-primary/40 text-[10px] leading-[15px] font-bold uppercase">
          Due Date
        </span>
        {dateTime ? (
          <time
            className="text-label-md leading-compact text-text-primary/70 font-medium"
            dateTime={dateTime}
          >
            {label}
          </time>
        ) : (
          <span className="text-label-md leading-compact text-text-primary/70 font-medium">
            {label}
          </span>
        )}
      </div>
    );
  }

  if (isOverdue) {
    return (
      <span className="text-danger flex shrink-0 items-center gap-1.5 text-[11px] leading-[16.5px] font-bold tracking-normal uppercase">
        <OverdueIcon />
        Overdue
      </span>
    );
  }

  return (
    <span className="flex shrink-0 items-center gap-1.5 text-[11px] leading-[16.5px] font-bold tracking-normal text-[rgba(67,70,84,0.7)] uppercase">
      <CalendarIcon className="h-[11.667px] w-[10.5px]" />
      {dateTime ? (
        <time dateTime={dateTime}>{label}</time>
      ) : (
        <span
          className={joinClasses(
            label === 'No due date' && 'tracking-normal normal-case',
          )}
        >
          {label}
        </span>
      )}
    </span>
  );
}
