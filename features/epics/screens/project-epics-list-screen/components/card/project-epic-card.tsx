import type { ReactElement } from 'react';
import { Card } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';
import type { ProjectEpicListItem } from '../../utils';
import { ProjectEpicAssigneeSummary } from './project-epic-assignee-summary';
import { ProjectEpicCardHeader } from './project-epic-card-header';
import { ProjectEpicCardTitle } from './project-epic-card-title';
import { ProjectEpicDesktopMetadata } from './project-epic-desktop-metadata';

type ProjectEpicCardProps = {
  epic: ProjectEpicListItem;
  hideOnMobile?: boolean;
};

export function ProjectEpicCard({
  epic,
  hideOnMobile = false,
}: ProjectEpicCardProps): ReactElement {
  return (
    <Card
      aria-labelledby={`${epic.id}-title`}
      className={joinClasses(
        'xl:border-l-success-icon flex flex-col gap-[11.3px] border-0 p-5 shadow-none lg:min-h-51.5 lg:justify-between lg:gap-2.75 lg:px-5 lg:py-4 lg:shadow-sm xl:border-l-4',
        hideOnMobile && 'hidden lg:flex',
      )}
      padding="none"
    >
      <ProjectEpicCardHeader epic={epic} />
      <ProjectEpicCardTitle epic={epic} />
      <ProjectEpicAssigneeSummary epic={epic} />
      <ProjectEpicDesktopMetadata epic={epic} />
    </Card>
  );
}
