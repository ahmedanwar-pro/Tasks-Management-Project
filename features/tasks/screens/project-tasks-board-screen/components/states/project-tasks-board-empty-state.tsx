import type { ReactElement } from 'react';
import { ListIcon } from '@/features/epics/screens/epic-details-modal/components/icons/epic-details-modal-icons';

export function ProjectTasksBoardEmptyState(): ReactElement {
  return (
    <div className="border-border-strong bg-surface-low/30 flex h-[216px] w-full shrink-0 flex-col items-center justify-center gap-3 rounded-md border border-dashed px-8 py-8 text-center">
      <div className="bg-primary-container-muted text-text-primary/30 flex size-12 items-center justify-center rounded-lg">
        <ListIcon />
      </div>
      <p className="text-text-subtle text-center text-[11px] leading-[16.5px] font-bold tracking-[1.1px] uppercase">
        No Items
      </p>
    </div>
  );
}
