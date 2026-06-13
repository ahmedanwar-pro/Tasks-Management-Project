import type { ReactElement } from 'react';
import { EditableEpicDescription } from '../editable';

type EpicDetailsDescriptionProps = {
  description: string;
  descriptionValue: string;
  disabled?: boolean;
  onSave: (description: string) => Promise<void>;
};

export function EpicDetailsDescription({
  description,
  descriptionValue,
  disabled = false,
  onSave,
}: EpicDetailsDescriptionProps): ReactElement {
  return (
    <section className="flex w-full flex-col gap-2 md:block">
      <EditableEpicDescription
        description={description}
        descriptionValue={descriptionValue}
        disabled={disabled}
        onSave={onSave}
      />
    </section>
  );
}
