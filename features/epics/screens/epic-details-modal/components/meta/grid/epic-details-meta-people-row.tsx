import type { ReactElement } from 'react';
import type { EpicDetailsDisplayData } from '../../../types';
import { EpicDetailsMetaItem } from './epic-details-meta-item';
import { EpicDetailsPerson } from '../epic-details-person';

type EpicDetailsMetaPeopleRowProps = {
  epic: EpicDetailsDisplayData;
};

export function EpicDetailsMetaPeopleRow({
  epic,
}: EpicDetailsMetaPeopleRowProps): ReactElement {
  return (
    <div className="grid w-full grid-cols-2 gap-6 md:contents">
      <EpicDetailsMetaItem label="Created By">
        <EpicDetailsPerson person={epic.createdBy} tone="createdBy" />
      </EpicDetailsMetaItem>
      <EpicDetailsMetaItem label="Assignee">
        <EpicDetailsPerson person={epic.assignee} tone="assignee" />
      </EpicDetailsMetaItem>
    </div>
  );
}
