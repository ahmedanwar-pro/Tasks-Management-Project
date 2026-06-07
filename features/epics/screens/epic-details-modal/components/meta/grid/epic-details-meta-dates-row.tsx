import type { ReactElement } from 'react';
import type { EpicDetailsDisplayData } from '../../../types';
import { EpicDetailsDate } from '../epic-details-date';
import { EpicDetailsMetaItem } from './epic-details-meta-item';

type EpicDetailsMetaDatesRowProps = {
  epic: EpicDetailsDisplayData;
};

export function EpicDetailsMetaDatesRow({
  epic,
}: EpicDetailsMetaDatesRowProps): ReactElement {
  return (
    <div className="border-surface-muted grid w-full grid-cols-2 gap-1 border-t pt-2.25 md:contents md:border-0 md:pt-0">
      <EpicDetailsMetaItem label="Deadline">
        <EpicDetailsDate value={epic.deadline} />
      </EpicDetailsMetaItem>
      <EpicDetailsMetaItem label="Created At">
        <EpicDetailsDate value={epic.createdAt} />
      </EpicDetailsMetaItem>
    </div>
  );
}
