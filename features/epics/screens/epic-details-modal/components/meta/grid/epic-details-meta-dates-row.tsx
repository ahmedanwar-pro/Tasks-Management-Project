import type { ReactElement } from 'react';
import type { EpicDetailsDisplayData } from '../../../types';
import { EditableEpicDeadline } from '../../editable';
import { EpicDetailsDate } from '../epic-details-date';
import { EpicDetailsMetaItem } from './epic-details-meta-item';

type EpicDetailsMetaDatesRowProps = {
  disabled?: boolean;
  epic: EpicDetailsDisplayData;
  onDeadlineSave: (deadline: string | null) => Promise<void>;
};

export function EpicDetailsMetaDatesRow({
  disabled = false,
  epic,
  onDeadlineSave,
}: EpicDetailsMetaDatesRowProps): ReactElement {
  return (
    <div className="border-surface-muted grid w-full grid-cols-2 gap-1 border-t pt-2.25 md:contents md:border-0 md:pt-0">
      <EditableEpicDeadline
        deadline={epic.deadline}
        deadlineValue={epic.deadlineValue}
        disabled={disabled}
        label="Deadline"
        onSave={onDeadlineSave}
      />
      <EpicDetailsMetaItem label="Created At">
        <EpicDetailsDate value={epic.createdAt} />
      </EpicDetailsMetaItem>
    </div>
  );
}
