import type { ReactElement } from 'react';
import type { EpicDetailsDisplayData } from '../../../types';
import { EpicDetailsMetaDatesRow } from './epic-details-meta-dates-row';
import { EpicDetailsMetaPeopleRow } from './epic-details-meta-people-row';

type EpicDetailsMetaGridProps = {
  epic: EpicDetailsDisplayData;
};

export function EpicDetailsMetaGrid({
  epic,
}: EpicDetailsMetaGridProps): ReactElement {
  return (
    <div className="flex w-full flex-col gap-5 md:grid md:grid-cols-3 md:gap-x-6 md:gap-y-6">
      <EpicDetailsMetaPeopleRow epic={epic} />
      <EpicDetailsMetaDatesRow epic={epic} />
    </div>
  );
}
