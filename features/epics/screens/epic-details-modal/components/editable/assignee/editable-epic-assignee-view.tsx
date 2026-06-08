import type { ReactElement } from 'react';
import type { EpicDetailsPerson as EpicDetailsPersonType } from '../../../types';
import { EpicDetailsPerson } from '../../meta/epic-details-person';
import { EditableEditButton } from '../editable-edit-button';

type EditableEpicAssigneeViewProps = {
  disabled: boolean;
  onEdit: () => void;
  person: EpicDetailsPersonType | null;
};

export function EditableEpicAssigneeView({
  disabled,
  onEdit,
  person,
}: EditableEpicAssigneeViewProps): ReactElement {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <button
        aria-label="Edit epic assignee"
        className="hover:bg-primary-container-muted/60 focus-visible:bg-primary-container-muted focus-visible:outline-primary -mx-1 flex min-w-0 flex-1 items-center gap-2 rounded-sm px-1 text-left outline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2"
        disabled={disabled}
        onClick={onEdit}
        type="button"
      >
        <EpicDetailsPerson person={person} tone="assignee" />
      </button>
      <EditableEditButton
        aria-label="Edit epic assignee"
        disabled={disabled}
        onClick={onEdit}
      />
    </div>
  );
}
