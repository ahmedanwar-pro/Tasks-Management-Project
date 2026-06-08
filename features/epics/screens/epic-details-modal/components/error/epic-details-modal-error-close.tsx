import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { EpicDetailsModalClose } from '../header/epic-details-modal-close';
import { epicDetailsCloseButtonClassName } from '../header/epic-details-modal-close-styles';

type EpicDetailsModalErrorCloseProps = {
  projectId: string;
};

export function EpicDetailsModalErrorClose({
  projectId,
}: EpicDetailsModalErrorCloseProps): ReactElement {
  return (
    <EpicDetailsModalClose
      className={joinClasses(
        epicDetailsCloseButtonClassName,
        'absolute top-4 right-4',
      )}
      projectId={projectId}
    />
  );
}
