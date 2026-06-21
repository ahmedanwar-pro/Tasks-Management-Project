import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';

type ProjectTasksListDueDateProps = {
  className?: string;
  dateTime: string;
  label: string;
  layout?: 'inline' | 'stacked';
};

export function ProjectTasksListDueDate({
  className,
  dateTime,
  label,
  layout = 'stacked',
}: ProjectTasksListDueDateProps): ReactElement {
  if (!dateTime) {
    if (layout === 'inline') {
      return (
        <span
          className={joinClasses(
            'text-text-secondary inline-flex text-[13px] leading-[17px]',
            className,
          )}
        >
          {label}
        </span>
      );
    }

    return (
      <span
        className={joinClasses(
          'text-text-secondary inline-flex flex-col items-center text-center text-[13px] leading-[17px]',
          className,
        )}
      >
        <span className="whitespace-nowrap">No due</span>
        <span className="whitespace-nowrap">date</span>
      </span>
    );
  }

  if (layout === 'inline') {
    return (
      <time
        className={joinClasses(
          'text-text-primary inline-flex text-[13px] leading-[17px]',
          className,
        )}
        dateTime={dateTime}
      >
        {label}
      </time>
    );
  }

  const yearMatch = label.match(/\d{4}$/);
  const dateLabel = yearMatch ? label.replace(/\s+\d{4}$/, '') : label;
  const yearLabel = yearMatch?.[0] ?? '';

  return (
    <time
      className={joinClasses(
        'text-text-primary inline-flex flex-col items-center text-center text-[13px] leading-[17px]',
        className,
      )}
      dateTime={dateTime}
    >
      <span className="whitespace-nowrap">{dateLabel}</span>
      {yearLabel ? (
        <span className="whitespace-nowrap">{yearLabel}</span>
      ) : null}
    </time>
  );
}
