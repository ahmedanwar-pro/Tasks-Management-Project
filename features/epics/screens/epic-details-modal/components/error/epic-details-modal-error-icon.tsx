import type { ReactElement } from 'react';

export function EpicDetailsModalErrorIcon(): ReactElement {
  return (
    <div className="bg-danger-container text-danger flex size-14 items-center justify-center rounded-lg">
      <span
        aria-hidden="true"
        className="text-title-lg leading-none font-semibold"
      >
        !
      </span>
    </div>
  );
}
