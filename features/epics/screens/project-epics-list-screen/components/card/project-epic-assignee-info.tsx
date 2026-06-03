import type { ReactElement } from 'react';
import { Avatar } from '@/components/ui';
import type { ProjectEpicListItem } from '../../utils';

type ProjectEpicAssigneeInfoProps = {
  epic: ProjectEpicListItem;
};

export function ProjectEpicAssigneeInfo({
  epic,
}: ProjectEpicAssigneeInfoProps): ReactElement {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar
        className="bg-primary leading-compact text-text-inverse xl:bg-success-strong xl:text-body-sm xl:leading-base xl:text-success-text size-7 rounded-lg text-[10px] xl:size-10"
        initials={epic.assignee.initials}
        name={epic.assignee.name}
        size="lg"
      />
      <div className="min-w-0 xl:flex xl:flex-col-reverse">
        <p className="text-text-primary xl:text-body-sm xl:leading-base truncate text-[12px] leading-tight font-medium xl:font-semibold">
          {epic.assignee.name}
        </p>
        <p className="text-text-muted leading-compact xl:text-text-secondary xl:text-label-md text-[10px] xl:leading-tight xl:font-medium">
          Assignee
        </p>
      </div>
    </div>
  );
}
