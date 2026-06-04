import type { ReactElement } from 'react';
import { Card } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';
import { ProjectEpicLoadingAssigneeSummary } from './project-epic-loading-assignee-summary';
import { ProjectEpicLoadingCardHeader } from './project-epic-loading-card-header';
import { ProjectEpicLoadingCardTitle } from './project-epic-loading-card-title';
import { ProjectEpicLoadingDesktopMetadata } from './project-epic-loading-desktop-metadata';

type ProjectEpicLoadingCardProps = {
  hideOnMobile?: boolean;
};

export function ProjectEpicLoadingCard({
  hideOnMobile = false,
}: ProjectEpicLoadingCardProps): ReactElement {
  return (
    <Card
      aria-hidden="true"
      className={joinClasses(
        'flex flex-col gap-[11.3px] border-0 p-5 shadow-none lg:min-h-51.5 lg:justify-between lg:gap-2.75 lg:px-5 lg:py-4 lg:shadow-sm xl:border-l-4 xl:border-l-transparent',
        hideOnMobile && 'hidden lg:flex',
      )}
      padding="none"
    >
      <ProjectEpicLoadingCardHeader />
      <ProjectEpicLoadingCardTitle />
      <ProjectEpicLoadingAssigneeSummary />
      <ProjectEpicLoadingDesktopMetadata />
    </Card>
  );
}
