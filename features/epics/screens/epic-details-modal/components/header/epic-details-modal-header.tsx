import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import type { EpicDetailsDisplayData } from '../../types';
import { EpicDetailsModalClose } from './epic-details-modal-close';
import { epicDetailsCloseButtonClassName } from './epic-details-modal-close-styles';
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
        className={joinClasses(
          epicDetailsCloseButtonClassName,
          'md:rounded-lg',
        )}
        projectId={projectId}
      />
    </header>
  );
}
