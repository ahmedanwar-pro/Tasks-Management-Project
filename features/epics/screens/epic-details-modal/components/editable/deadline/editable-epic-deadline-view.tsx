import type { ReactElement } from 'react';
import { EditableEditButton } from '../editable-edit-button';
import { EpicDetailsDate } from '../../meta/epic-details-date';

type EditableEpicDeadlineViewProps = {
  deadline: string;
  disabled: boolean;
  onEdit: () => void;
};

export function EditableEpicDeadlineView({
  deadline,
  disabled,
  onEdit,
}: EditableEpicDeadlineViewProps): ReactElement {
  return (
    <div className="flex min-w-0 items-center gap-3 md:gap-2">
      <button
        aria-label="Edit epic deadline"
        className="hover:bg-primary-container-muted/60 focus-visible:bg-primary-container-muted focus-visible:outline-primary -mx-1 flex min-w-0 flex-1 rounded-sm px-1 text-left outline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2"
        disabled={disabled}
        onClick={onEdit}
        type="button"
      >
        <EpicDetailsDate value={deadline} />
      </button>
      <EditableEditButton
        aria-label="Edit epic deadline"
        disabled={disabled}
        onClick={onEdit}
      />
    </div>
  );
}
