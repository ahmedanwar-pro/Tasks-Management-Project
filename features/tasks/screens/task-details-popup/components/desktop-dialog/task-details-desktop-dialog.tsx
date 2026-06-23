import type { ReactElement } from 'react';
import { TaskDetailsActions } from './task-details-actions';
import { TaskDetailsDescription } from './task-details-description';
import { TaskDetailsMetaPanel } from './task-details-meta-panel';
import { TaskDetailsTitleBlock } from './task-details-title-block';
import type { TaskDetailsPopupMock } from '../../task-details-popup.types';

type TaskDetailsDesktopDialogProps = {
  details: TaskDetailsPopupMock;
  onCopyLink: () => void;
  onClose: () => void;
};

export function TaskDetailsDesktopDialog({
  details,
  onCopyLink,
  onClose,
}: TaskDetailsDesktopDialogProps): ReactElement {
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
          className="bg-surface shadow-modal pointer-events-auto flex h-[870px] max-h-[calc(100dvh-48px)] w-[896px] max-w-[calc(100vw-48px)] overflow-hidden rounded-md"
          role="dialog"
          tabIndex={-1}
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <TaskDetailsTitleBlock details={details} />
            <div className="min-h-0 flex-1 overflow-hidden p-8">
              <TaskDetailsDescription description={details.description} />
            </div>
            <TaskDetailsActions onClose={onClose} onCopyLink={onCopyLink} />
          </div>
          <aside className="bg-surface-low border-surface-muted h-full w-[320px] shrink-0 border-l">
            <TaskDetailsMetaPanel details={details} />
          </aside>
        </section>
      </div>
    </>
  );
}
