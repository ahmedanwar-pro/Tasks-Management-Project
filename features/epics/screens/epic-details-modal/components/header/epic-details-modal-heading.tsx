import type { ReactElement } from 'react';
import { EditableEpicTitle } from '../editable';

type EpicDetailsModalHeadingProps = {
  disabled?: boolean;
  onSave: (title: string) => Promise<void>;
  title: string;
};

export function EpicDetailsModalHeading({
  disabled = false,
  onSave,
  title,
}: EpicDetailsModalHeadingProps): ReactElement {
  return (
    <EditableEpicTitle
      disabled={disabled}
      onSave={onSave}
      title={title}
    />
  );
}
