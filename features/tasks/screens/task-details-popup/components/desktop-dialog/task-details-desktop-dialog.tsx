import { useRef } from 'react';
import type { ReactElement } from 'react';
import { useFocusTrap } from '@/components/ui/use-focus-trap';
import { EpicFormFeedback } from '@/features/epics/screens/shared/components';
import { TaskDetailsActions } from './task-details-actions';
import { TaskDetailsDescription } from './task-details-description';
import { TaskDetailsMetaPanel } from './task-details-meta-panel';
import { TaskDetailsTitleBlock } from './task-details-title-block';
import { TaskDetailsCloseIcon } from '../shared/task-details-icons';
import { useTaskDetailsEditing } from '../editable';
import type {
  TaskDetailsCopyFeedback,
  TaskDetailsPopupDetails,
} from '../../task-details-popup.types';

type TaskDetailsDesktopDialogProps = {
  copyFeedback?: TaskDetailsCopyFeedback | null;
  details: TaskDetailsPopupDetails;
  isFocusTrapActive?: boolean;
  onCopyLink: () => void;
  onClose: () => void;
};

function TaskDetailsDesktopUpdateFeedback(): ReactElement | null {
  const { error, success } = useTaskDetailsEditing();

  if (!error && !success) return null;

  return (
    <div className="px-8 pt-4">
      <div className="max-w-[512px]">
        <EpicFormFeedback
          error={error ?? undefined}
          success={success ?? undefined}
        />
      </div>
    </div>
  );
}

export function TaskDetailsDesktopDialog({
  copyFeedback,
  details,
  isFocusTrapActive = true,
  onCopyLink,
  onClose,
}: TaskDetailsDesktopDialogProps): ReactElement {
  const panelRef = useRef<HTMLElement>(null);

  useFocusTrap({
    active: isFocusTrapActive,
    containerRef: panelRef,
    initialFocus: 'none',
    onEscape: onClose,
  });

  return (
    <>
      <button
        aria-label="Close task details"
        className="bg-text-primary/40 fixed inset-0 z-40 backdrop-blur-[2px]"
        onClick={onClose}
        type="button"
      />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-6">
        <section
          aria-labelledby="task-details-dialog-title"
          aria-modal="true"
          className="bg-surface shadow-modal pointer-events-auto relative flex h-[870px] max-h-[calc(100dvh-48px)] w-[896px] max-w-[calc(100vw-48px)] overflow-hidden rounded-md"
          ref={panelRef}
          role="dialog"
          tabIndex={-1}
        >
          <button
            aria-label="Close task details"
            className="text-text-secondary hover:bg-surface-low hover:text-text-primary focus-visible:outline-primary absolute top-4 right-4 z-10 flex size-[var(--control-height-xs)] items-center justify-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={onClose}
            type="button"
          >
            <TaskDetailsCloseIcon />
          </button>
          <div className="flex min-w-0 flex-1 flex-col">
            <TaskDetailsTitleBlock details={details} />
            <TaskDetailsDesktopUpdateFeedback />
            <div className="min-h-0 flex-1 overflow-hidden p-8">
              <TaskDetailsDescription
                description={details.description}
                descriptionValue={details.descriptionValue}
              />
            </div>
            <TaskDetailsActions
              copyFeedback={copyFeedback}
              onClose={onClose}
              onCopyLink={onCopyLink}
            />
          </div>
          <aside className="bg-surface-low border-surface-muted h-full w-[320px] shrink-0 border-l">
            <TaskDetailsMetaPanel details={details} />
          </aside>
        </section>
      </div>
    </>
  );
}
