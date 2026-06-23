import type { ReactElement } from 'react';
import { Button } from '@/components/ui';
import { TaskDetailsCopyLinkIcon } from '../shared/task-details-icons';

type TaskDetailsActionsProps = {
  onCopyLink: () => void;
  onClose: () => void;
};

export function TaskDetailsActions({
  onCopyLink,
  onClose,
}: TaskDetailsActionsProps): ReactElement {
  return (
    <footer className="bg-surface-low flex h-[68px] shrink-0 items-center justify-between px-8 py-4">
      <Button
        aria-label="Copy current task link"
        className="text-body-sm leading-base text-text-secondary h-[var(--control-height-xs)] px-3 font-medium"
        iconLeft={<TaskDetailsCopyLinkIcon />}
        onClick={onCopyLink}
        size="sm"
        variant="ghost"
      >
        Copy link
      </Button>
      <button
        className="bg-primary-container-muted text-body-sm text-text-primary focus-visible:outline-primary leading-base hover:bg-primary-container-muted active:bg-primary-container-muted inline-flex h-[var(--control-height-sm)] w-[70.48px] items-center justify-center rounded-sm border border-transparent font-sans font-semibold tracking-normal shadow-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
        onClick={onClose}
        type="button"
      >
        Close
      </button>
    </footer>
  );
}
