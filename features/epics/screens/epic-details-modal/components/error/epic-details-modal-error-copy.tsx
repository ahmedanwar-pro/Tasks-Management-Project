import type { ReactElement } from 'react';

export function EpicDetailsModalErrorCopy(): ReactElement {
  return (
    <>
      <h2
        className="text-title-lg text-text-primary mt-5 font-semibold"
        id="epic-details-error-title"
      >
        Something went wrong
      </h2>
      <p className="text-body-sm text-text-secondary leading-base mt-2">
        We&apos;re having trouble retrieving this epic right now. Please try
        again in a moment.
      </p>
    </>
  );
}
