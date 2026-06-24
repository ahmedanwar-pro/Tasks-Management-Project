import type { ReactElement } from 'react';

type TaskDetailsEmptyContentProps = {
  message?: string;
};

export function TaskDetailsEmptyContent({
  message,
}: TaskDetailsEmptyContentProps): ReactElement {
  return (
    <div
      className="flex min-h-80 w-full flex-1 items-center justify-center px-6 py-10"
      role="status"
    >
      <p className="text-body-sm text-text-secondary font-medium">
        {message ?? ''}
      </p>
    </div>
  );
}
