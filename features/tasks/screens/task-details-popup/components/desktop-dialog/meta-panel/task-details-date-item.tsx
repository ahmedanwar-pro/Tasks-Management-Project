import type { ReactElement } from 'react';

type TaskDetailsDateItemProps = {
  label: string;
  value: string;
};

export function TaskDetailsDateItem({
  label,
  value,
}: TaskDetailsDateItemProps): ReactElement {
  return (
    <article className="flex items-center justify-between">
      <p className="text-label-md text-text-secondary leading-tight font-normal">
        {label}
      </p>
      <p className="text-body-sm text-text-primary leading-base font-medium">
        {value}
      </p>
    </article>
  );
}
