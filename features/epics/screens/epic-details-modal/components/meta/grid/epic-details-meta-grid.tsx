import type { ReactElement } from 'react';
import type { EpicDetailsDisplayData } from '../../../types';
import { EpicDetailsMetaDatesRow } from './epic-details-meta-dates-row';
import { EpicDetailsMetaPeopleRow } from './epic-details-meta-people-row';

type EpicDetailsMetaGridProps = {
  disabled?: boolean;
  epic: EpicDetailsDisplayData;
  onAssigneeSave: (assigneeId: string | null) => Promise<void>;
  projectId: string;
};

export function EpicDetailsMetaGrid({
  disabled = false,
  epic,
  onAssigneeSave,
  projectId,
}: EpicDetailsMetaGridProps): ReactElement {
  return (
    <div className="flex w-full flex-col gap-5 md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-6">
      <EpicDetailsMetaPeopleRow
        disabled={disabled}
        epic={epic}
        onAssigneeSave={onAssigneeSave}
        projectId={projectId}
      />
      <EpicDetailsMetaDatesRow epic={epic} />
    </div>
  );
}
