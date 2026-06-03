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
      <dt className="text-text-muted text-[10px] leading-compact font-bold tracking-[-0.5px] whitespace-nowrap uppercase">
        Deadline
      </dt>
      <dd className="text-text-primary text-[12px] leading-tight font-medium whitespace-nowrap">
        {epic.createdDate}
      </dd>
    </dl>
  );
}
