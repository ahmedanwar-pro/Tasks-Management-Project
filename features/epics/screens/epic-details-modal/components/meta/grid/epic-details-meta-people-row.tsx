import type { ReactElement } from 'react';
import type { EpicDetailsDisplayData } from '../../../types';
import { EditableEpicAssignee } from '../../editable';
import { EpicDetailsMetaItem } from './epic-details-meta-item';
import { EpicDetailsPerson } from '../epic-details-person';

type EpicDetailsMetaPeopleRowProps = {
  disabled?: boolean;
  epic: EpicDetailsDisplayData;
  onAssigneeSave: (assigneeId: string | null) => Promise<void>;
  projectId: string;
};

export function EpicDetailsMetaPeopleRow({
  disabled = false,
  epic,
  onAssigneeSave,
  projectId,
}: EpicDetailsMetaPeopleRowProps): ReactElement {
  return (
    <div className="grid w-full grid-cols-2 gap-6 md:contents">
      <EpicDetailsMetaItem label="Created By">
        <EpicDetailsPerson person={epic.createdBy} tone="createdBy" />
      </EpicDetailsMetaItem>
      <EpicDetailsMetaItem label="Assignee">
        <EditableEpicAssignee
          assigneeId={epic.assigneeId}
          disabled={disabled}
          onSave={onAssigneeSave}
          person={epic.assignee}
          projectId={projectId}
        />
      </EpicDetailsMetaItem>
    </div>
  );
}
