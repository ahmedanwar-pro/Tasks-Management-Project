import type { ReactElement } from 'react';
import type { ProjectEpicListItem } from '../../utils';
import { ProjectEpicAssigneeInfo } from './project-epic-assignee-info';
import { ProjectEpicMobileDeadline } from './project-epic-mobile-deadline';

type ProjectEpicAssigneeSummaryProps = {
  epic: ProjectEpicListItem;
};

export function ProjectEpicAssigneeSummary({
  epic,
}: ProjectEpicAssigneeSummaryProps): ReactElement {
  return (
    <div className="flex items-center justify-between gap-4 pt-[4.7px] xl:block xl:pt-0">
      <ProjectEpicAssigneeInfo epic={epic} />
      <ProjectEpicMobileDeadline epic={epic} />
    </div>
  );
}
