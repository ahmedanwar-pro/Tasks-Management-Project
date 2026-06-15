import Link from 'next/link';
import type { ReactElement } from 'react';
import { Button } from '@/components/ui';
import { CreateTaskIcon } from '../add-new-task-form-icons';

type AddNewTaskFormActionsProps = {
  isCreating?: boolean;
  projectId: string;
};

export function AddNewTaskFormActions({
  isCreating = false,
  projectId,
}: AddNewTaskFormActionsProps): ReactElement {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-20 flex flex-col gap-3 bg-white/80 p-6 shadow-[0px_-8px_24px_0px_rgba(4,27,60,0.06)] backdrop-blur-md lg:static lg:flex-row-reverse lg:items-center lg:gap-4 lg:bg-transparent lg:p-0 lg:pt-6 lg:shadow-none lg:backdrop-blur-none">
      <Button
        className="text-body-md h-(--control-height-2xl) rounded-sm font-bold lg:h-(--control-height-xl) lg:w-auto lg:px-8 lg:font-semibold"
        fullWidth
        iconLeft={<CreateTaskIcon />}
        isLoading={isCreating}
        loadingText="Creating task"
        type="submit"
      >
        Create Task
      </Button>
      <Link
        className="text-text-tertiary focus-visible:outline-primary text-body-md flex h-(--control-height-xl) items-center justify-center rounded-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 lg:px-6"
        href={`/projects/${projectId}/tasks`}
      >
        Back
      </Link>
    </div>
  );
}
