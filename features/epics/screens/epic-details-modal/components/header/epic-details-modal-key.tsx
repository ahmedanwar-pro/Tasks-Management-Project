import type { ReactElement } from 'react';
import { EpicKeyIcon } from '../icons/epic-details-modal-icons';

type EpicDetailsModalKeyProps = {
  epicKey: string;
};

export function EpicDetailsModalKey({
  epicKey,
}: EpicDetailsModalKeyProps): ReactElement {
  return (
    <div className="text-primary flex items-center gap-2">
      <EpicKeyIcon className="hidden md:block" />
      <p className="text-primary md:text-text-primary/60 leading-compact flex h-3.75 flex-col justify-center text-[10px] font-bold tracking-[1px] uppercase md:h-4 md:text-[12px] md:leading-4 md:tracking-[0.6px]">
        {epicKey}
      </p>
    </div>
  );
}
