import Link from 'next/link';
import type { ReactElement } from 'react';
import { Button } from '@/components/ui';
import { getProjectsPageHref } from '../../projects-list-screen/utils/projects-list-navigation';

type EditProjectFormActionsProps = {
  initialPage: number;
  initialSource: 'list' | 'sidebar';
  isLoading: boolean;
  projectId: string;
};

export function EditProjectFormActions({
  initialPage,
  initialSource,
  isLoading,
  projectId,
}: EditProjectFormActionsProps): ReactElement {
  const cancelHref =
    initialSource === 'sidebar'
      ? `/projects/${projectId}/epics`
      : getProjectsPageHref(initialPage);

  return (
    <div className="flex flex-col gap-4 pt-4 lg:flex-row-reverse lg:items-center lg:justify-between">
      <Button
        className="text-body-md! self-center rounded-md px-8! py-6 leading-relaxed! font-semibold!"
        isLoading={isLoading}
        loadingText="Saving project"
        size="md"
        type="submit"
        variant="secondary"
      >
        Save
      </Button>
      <Link
        className="text-primary text-body-md focus-visible:outline-primary lg:text-text-tertiary lg:text-body-sm lg:leading-base flex h-(--control-height-xl) items-center justify-center rounded-md leading-relaxed font-medium focus-visible:outline-2 focus-visible:outline-offset-2 lg:w-auto lg:px-6 lg:font-bold"
        href={cancelHref}
      >
        Cancel
      </Link>
    </div>
  );
}
