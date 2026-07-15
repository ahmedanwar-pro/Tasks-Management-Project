import Link from 'next/link';
import type { ReactElement } from 'react';
import { Button } from '@/components/ui';
import { getProjectsPageHref } from '../../projects-list-screen/utils/projects-list-navigation';

type ProjectFormActionsProps = {
  currentPage: number;
  isLoading: boolean;
};

export function ProjectFormActions({
  currentPage,
  isLoading,
}: ProjectFormActionsProps): ReactElement {
  return (
    <div className="flex flex-col gap-4 pt-4 lg:flex-row-reverse lg:items-center lg:justify-between">
      <Button
        className="text-body-md! h-(--control-height-2xl)! self-center rounded-md px-4.5! py-2 leading-relaxed! font-semibold!"
        isLoading={isLoading}
        loadingText="Creating project"
        size="lg"
        type="submit"
        variant="secondary"
      >
        Create Project
      </Button>
      <Link
        className="text-primary text-body-md focus-visible:outline-primary lg:text-text-tertiary lg:text-body-sm lg:leading-base flex h-(--control-height-xl) items-center justify-center rounded-md leading-relaxed font-medium focus-visible:outline-2 focus-visible:outline-offset-2 lg:w-auto lg:px-6 lg:font-bold"
        href={getProjectsPageHref(currentPage)}
      >
        Back
      </Link>
    </div>
  );
}
