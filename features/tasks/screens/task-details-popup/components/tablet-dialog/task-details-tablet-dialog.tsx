import { useRef } from 'react';
import type { ReactElement } from 'react';
import { useFocusTrap } from '@/components/ui/use-focus-trap';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import { TaskDetailsTabletContent } from './task-details-tablet-content';
import { TaskDetailsTabletFooter } from './task-details-tablet-footer';
import { TaskDetailsTabletHeader } from './task-details-tablet-header';

type TaskDetailsTabletDialogProps = {
  details: TaskDetailsPopupDetails;
  isFocusTrapActive?: boolean;
  onClose: () => void;
};

export function TaskDetailsTabletDialog({
  details,
  isFocusTrapActive = true,
  onClose,
}: TaskDetailsTabletDialogProps): ReactElement {
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
          aria-labelledby="task-details-tablet-title"
          aria-modal="true"
          className="bg-surface shadow-modal pointer-events-auto flex max-h-[calc(100dvh-48px)] w-full max-w-[720px] flex-col overflow-hidden rounded-md"
          ref={panelRef}
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
