import type { ReactElement } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui';
import type { ProjectListItem } from '../../types';
import { ProjectCardCreatedAt } from './project-card-created-at';
import { ProjectCardDetails } from './project-card-details';

type ProjectCardProps = {
  project: ProjectListItem;
  className?: string;
};

export function ProjectCard({
  project,
  className,
}: ProjectCardProps): ReactElement {
  return (
    <li className={className}>
      <Card
        className="pt-4-5 relative flex h-52.75 flex-col px-5 pb-5 shadow-sm lg:h-55 lg:justify-between lg:p-6 lg:shadow-none"
        padding="none"
      >
        <Link
          aria-label={`Open epics for ${project.title}`}
          className="focus-visible:outline-primary absolute inset-0 z-10 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
          href={`/projects/${project.id}/epics`}
        />
        <ProjectCardDetails project={project} />
        <ProjectCardCreatedAt project={project} />
      </Card>
    </li>
  );
}
