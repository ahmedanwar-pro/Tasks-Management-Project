import type { ReactElement } from 'react';
import type { EpicDetailsDisplayData } from '../../types';
import { EpicDetailsModalClose } from './epic-details-modal-close';
import { EpicDetailsModalTitleBlock } from './epic-details-modal-title-block';

type EpicDetailsModalHeaderProps = {
  epic: EpicDetailsDisplayData;
  projectId: string;
};

export function EpicDetailsModalHeader({
  epic,
  projectId,
}: EpicDetailsModalHeaderProps): ReactElement {
  return (
    <header className="from-surface to-surface-low md:border-border-subtle flex w-full shrink-0 items-start justify-between gap-8 bg-linear-to-br px-6 pt-6 pb-4 md:border-b md:bg-none md:px-8 md:pt-8 md:pb-[33px]">
      <EpicDetailsModalTitleBlock epicKey={epic.epicKey} title={epic.title} />
      <EpicDetailsModalClose
        className="text-text-tertiary focus-visible:outline-primary flex size-8 shrink-0 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 md:rounded-lg"
        projectId={projectId}
      />
    </header>
  );
}
