import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { MoreHorizontalIcon } from '../../../project-tasks-board-screen/components/icons';

type ProjectTasksListSettingsButtonProps = {
  variant?: 'desktop' | 'mobile';
  taskTitle: string;
};

function MoreVerticalIcon({ className }: { className?: string }): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className={joinClasses('h-4 w-1 shrink-0', className)}
      fill="currentColor"
      focusable="false"
      viewBox="0 0 4 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="2" r="1.5" />
      <circle cx="2" cy="8" r="1.5" />
      <circle cx="2" cy="14" r="1.5" />
    </svg>
  );
}

export function ProjectTasksListSettingsButton({
  variant = 'desktop',
  taskTitle,
}: ProjectTasksListSettingsButtonProps): ReactElement {
  return (
    <button
      aria-label={`Open settings for ${taskTitle}`}
      className="text-text-secondary hover:text-primary focus-visible:outline-primary inline-flex size-8 items-center justify-center rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      type="button"
    >
      {variant === 'mobile' ? (
        <MoreVerticalIcon className="text-[#43465466]" />
      ) : (
        <MoreHorizontalIcon />
      )}
    </button>
  );
}
