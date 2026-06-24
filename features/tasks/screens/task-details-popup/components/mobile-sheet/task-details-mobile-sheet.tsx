import { useRef } from 'react';
import type { ReactElement } from 'react';
import { useFocusTrap } from '@/components/ui/use-focus-trap';
import type { TaskDetailsPopupDetails } from '../../task-details-popup.types';
import { TaskDetailsMobileDescription } from './task-details-mobile-description';
import { TaskDetailsMobileHeader } from './task-details-mobile-header';
import { TaskDetailsMobileMetaGrid } from './task-details-mobile-meta-grid';
import { TaskDetailsMobileTitleSection } from './task-details-mobile-title-section';

type TaskDetailsMobileSheetProps = {
  details: TaskDetailsPopupDetails;
  isFocusTrapActive?: boolean;
  onClose: () => void;
};

export function TaskDetailsMobileSheet({
  details,
  isFocusTrapActive = true,
  onClose,
}: TaskDetailsMobileSheetProps): ReactElement {
  const panelRef = useRef<HTMLElement>(null);

  useFocusTrap({
    active: isFocusTrapActive,
    containerRef: panelRef,
    initialFocus: 'none',
    onEscape: onClose,
  });

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        aria-label="Close task details"
        className="bg-text-primary/20 fixed inset-0 backdrop-blur-[2px]"
        onClick={onClose}
        type="button"
      />
      <section
        aria-labelledby="task-details-mobile-title"
        aria-modal="true"
        className="border-border-inverse/40 bg-surface/70 shadow-modal fixed inset-x-0 bottom-0 flex h-[min(660px,calc(100dvh-24px))] flex-col overflow-hidden rounded-t-[24px] border-t pt-px backdrop-blur-[10px]"
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <TaskDetailsMobileHeader onClose={onClose} taskKey={details.taskKey} />

        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="flex h-full flex-col gap-8 overflow-y-auto px-4 pt-2 pb-[119px] min-[375px]:px-6">
            <TaskDetailsMobileTitleSection
              epicLabel={details.epicLabel}
              status={details.status}
              title={details.title}
            />

            <TaskDetailsMobileMetaGrid details={details} />
            <TaskDetailsMobileDescription description={details.description} />
          </div>
        </div>
      </section>
    </div>
  );
}
