import Link from 'next/link';
import type { ReactElement } from 'react';
import { Button } from '@/components/ui';

type AddNewEpicFormActionsProps = {
  isLoading: boolean;
  projectId: string;
};

export function AddNewEpicFormActions({
  isLoading,
  projectId,
}: AddNewEpicFormActionsProps): ReactElement {
  return (
    <div className="border-border-subtle flex flex-col gap-3 pt-6 lg:flex-row-reverse lg:items-center lg:justify-start lg:gap-4 lg:border-t lg:pt-8">
      <Button
        className="text-body-md lg:text-body-sm h-(--control-height-2xl) rounded-sm px-10 font-semibold lg:h-(--control-height-xl) lg:w-auto lg:font-bold"
        fullWidth
        isLoading={isLoading}
        loadingText="Creating epic"
        type="submit"
      >
        Create Epic
      </Button>
      <Link
        className="text-text-tertiary focus-visible:outline-primary text-body-md lg:text-body-sm flex h-(--control-height-2xl) items-center justify-center rounded-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 lg:h-(--control-height-xl) lg:px-6"
        href={`/projects/${projectId}/epics`}
      >
        Cancel
      </Link>
    </div>
  );
}
