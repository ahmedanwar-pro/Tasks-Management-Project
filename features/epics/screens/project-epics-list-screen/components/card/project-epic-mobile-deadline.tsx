import type { ReactElement } from 'react';
import type { ProjectEpicListItem } from '../../utils';

type ProjectEpicMobileDeadlineProps = {
  epic: ProjectEpicListItem;
};

export function ProjectEpicMobileDeadline({
  epic,
}: ProjectEpicMobileDeadlineProps): ReactElement {
  return (
    <dl className="min-w-0 shrink-0 text-right lg:hidden">
      <dt className="text-text-muted leading-compact text-[10px] font-bold tracking-tight whitespace-nowrap uppercase">
        Deadline
      </dt>
      <dd className="text-text-primary text-[12px] leading-tight font-medium whitespace-nowrap">
        {epic.deadline}
      </dd>
    </dl>
  );
}
