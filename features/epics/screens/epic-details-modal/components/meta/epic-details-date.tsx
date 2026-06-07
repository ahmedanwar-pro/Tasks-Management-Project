import type { ReactElement } from 'react';
import { CalendarIcon } from '../icons/epic-details-modal-icons';

type EpicDetailsDateProps = {
  value: string;
};

export function EpicDetailsDate({ value }: EpicDetailsDateProps): ReactElement {
  return (
    <div className="flex min-w-0 items-center gap-2 text-text-primary">
      <CalendarIcon className="text-primary md:text-text-primary/40" />
      <span className="min-w-0 truncate text-body-sm font-medium leading-base">
        {value}
      </span>
    </div>
  );
}
