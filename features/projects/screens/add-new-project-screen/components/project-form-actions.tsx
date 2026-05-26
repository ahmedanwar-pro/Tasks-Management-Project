import Link from 'next/link';
import type { ReactElement } from 'react';
import { Button } from '@/components/ui';

type ProjectFormActionsProps = {
  isLoading: boolean;
};

export function ProjectFormActions({
  isLoading,
}: ProjectFormActionsProps): ReactElement {
  return (
    <div className="flex flex-col gap-4 pt-4 lg:flex-row-reverse lg:items-center lg:justify-between">
      <Button
        className="rounded-md lg:w-auto! lg:rounded-sm"
        fullWidth
        isLoading={isLoading}
        loadingText="Creating project"
        size="lg"
        type="submit"
      >
        Create Project
      </Button>
      <Link
        className="text-primary text-body-md focus-visible:outline-primary lg:text-text-tertiary lg:text-body-sm lg:leading-base flex h-(--control-height-xl) items-center justify-center rounded-md leading-relaxed font-medium focus-visible:outline-2 focus-visible:outline-offset-2 lg:w-auto lg:px-6 lg:font-bold"
        href="/projects"
      >
        Back
      </Link>
    </div>
  );
}
