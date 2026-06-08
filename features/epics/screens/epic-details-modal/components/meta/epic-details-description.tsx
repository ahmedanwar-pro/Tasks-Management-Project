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
      <h3 className="text-[11px] font-bold uppercase leading-[16.5px] tracking-[0.55px] text-text-tertiary md:hidden">
        Description
      </h3>
      <EditableEpicDescription
        description={description}
        descriptionValue={descriptionValue}
        disabled={disabled}
        onSave={onSave}
      />
    </section>
  );
}
