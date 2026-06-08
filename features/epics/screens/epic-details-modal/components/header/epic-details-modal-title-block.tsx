import type { ReactElement } from 'react';
import { EpicDetailsModalHeading } from './epic-details-modal-heading';
import { EpicDetailsModalKey } from './epic-details-modal-key';

type EpicDetailsModalTitleBlockProps = {
  disabled?: boolean;
  epicKey: string;
  onTitleSave: (title: string) => Promise<void>;
  title: string;
};

export function EpicDetailsModalTitleBlock({
  disabled = false,
  epicKey,
  onTitleSave,
  title,
}: EpicDetailsModalTitleBlockProps): ReactElement {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1 md:gap-2">
      <EpicDetailsModalKey epicKey={epicKey} />
      <EpicDetailsModalHeading
        disabled={disabled}
        key={title}
        onSave={onTitleSave}
        title={title}
      />
    </div>
  );
}
