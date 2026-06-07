import type { ReactElement } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';
import type { ProjectEpicListItem } from '../../types';
import { ProjectEpicAssigneeSummary } from './project-epic-assignee-summary';
import { ProjectEpicCardHeader } from './project-epic-card-header';
import { ProjectEpicCardTitle } from './project-epic-card-title';
import { ProjectEpicDesktopMetadata } from './project-epic-desktop-metadata';

type ProjectEpicCardProps = {
  epic: ProjectEpicListItem;
  hideOnMobile?: boolean;
  projectId: string;
};

export function ProjectEpicCard({
  epic,
  hideOnMobile = false,
  projectId,
}: ProjectEpicCardProps): ReactElement {
  return (
    <Card
      aria-labelledby={`${epic.id}-title`}
      className={joinClasses(
        'xl:border-l-success-icon relative flex flex-col gap-[11.3px] border-0 p-5 shadow-none lg:min-h-[166px] lg:justify-between lg:gap-2.75 lg:px-5 lg:py-4 lg:shadow-sm xl:border-l-4',
        hideOnMobile && 'hidden lg:flex',
      )}
      padding="none"
    >
      <Link
        aria-label={`Open details for ${epic.title}`}
        className="focus-visible:outline-primary absolute inset-0 z-10 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
        href={`/projects/${projectId}/epics/${epic.id}`}
      />
      <ProjectEpicCardHeader epic={epic} />
      <ProjectEpicCardTitle epic={epic} />
      <ProjectEpicAssigneeSummary epic={epic} />
      <ProjectEpicDesktopMetadata epic={epic} />
    </Card>
  );
}
