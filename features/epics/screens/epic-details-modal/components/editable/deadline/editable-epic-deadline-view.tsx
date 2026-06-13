import type { ReactElement } from 'react';
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
    <button
      aria-label="Edit epic deadline"
      className="hover:bg-primary-container-muted/60 focus-visible:bg-primary-container-muted focus-visible:outline-primary -mx-1 flex min-w-0 rounded-sm px-1 text-left outline-offset-4 transition-colors focus-visible:outline focus-visible:outline-2"
      disabled={disabled}
      onClick={onEdit}
      type="button"
    >
      <EpicDetailsDate value={deadline} />
    </button>
  );
}
