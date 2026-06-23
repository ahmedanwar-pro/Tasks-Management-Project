import type { ReactElement } from 'react';
import type { TaskDetailsPopupMock } from '../../task-details-popup.types';
import { TaskDetailsTabletContent } from './task-details-tablet-content';
import { TaskDetailsTabletFooter } from './task-details-tablet-footer';
import { TaskDetailsTabletHeader } from './task-details-tablet-header';

type TaskDetailsTabletDialogProps = {
  details: TaskDetailsPopupMock;
  onClose: () => void;
};

export function TaskDetailsTabletDialog({
  details,
  onClose,
}: TaskDetailsTabletDialogProps): ReactElement {
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
          aria-labelledby="task-details-tablet-title"
          aria-modal="true"
          className="bg-surface shadow-modal pointer-events-auto flex max-h-[calc(100dvh-48px)] w-full max-w-[720px] flex-col overflow-hidden rounded-md"
          role="dialog"
          tabIndex={-1}
        >
          <TaskDetailsTabletHeader details={details} onClose={onClose} />
          <TaskDetailsTabletContent details={details} />
          <TaskDetailsTabletFooter onClose={onClose} />
        </section>
      </div>
    </>
  );
}
