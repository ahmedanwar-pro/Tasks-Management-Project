import type { ReactElement } from 'react';
import { EpicDetailsModalHeading } from './epic-details-modal-heading';
import { EpicDetailsModalKey } from './epic-details-modal-key';

type EpicDetailsModalTitleBlockProps = {
  epicKey: string;
  title: string;
};

export function EpicDetailsModalTitleBlock({
  epicKey,
  title,
}: EpicDetailsModalTitleBlockProps): ReactElement {
  return (
    <div className="flex min-w-0 flex-col gap-1 md:gap-2">
      <EpicDetailsModalKey epicKey={epicKey} />
      <EpicDetailsModalHeading title={title} />
    </div>
  );
}
