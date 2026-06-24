import type { ReactElement } from 'react';
import { Button } from '@/components/ui';
import { TaskDetailsCopyLinkIcon } from '../shared/task-details-icons';
import type { TaskDetailsCopyFeedback } from '../../task-details-popup.types';

type TaskDetailsActionsProps = {
  copyFeedback?: TaskDetailsCopyFeedback | null;
  onCopyLink: () => void;
  onClose: () => void;
};

export function TaskDetailsActions({
  copyFeedback,
  onCopyLink,
  onClose,
}: TaskDetailsActionsProps): ReactElement {
  const feedbackMessage = copyFeedback?.success ?? copyFeedback?.error;
  const feedbackClassName = copyFeedback?.error
    ? 'text-danger'
    : 'text-success-icon';

  return (
    <footer className="bg-surface-low flex h-[68px] shrink-0 items-center justify-between px-8 py-4">
      <div className="flex min-w-0 items-center gap-3">
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
        {feedbackMessage ? (
          <p
            aria-live="polite"
            className={`${feedbackClassName} text-label-sm truncate font-medium`}
            role="status"
          >
            {feedbackMessage}
          </p>
        ) : null}
      </div>
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
