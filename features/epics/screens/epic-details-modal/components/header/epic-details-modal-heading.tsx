import type { ReactElement } from 'react';

type EpicDetailsModalHeadingProps = {
  title: string;
};

export function EpicDetailsModalHeading({
  title,
}: EpicDetailsModalHeadingProps): ReactElement {
  return (
    <h2
      className="text-title-lg text-text-primary md:text-headline-md md:leading-section leading-6.25 font-bold tracking-tight md:tracking-normal"
      id="epic-details-modal-title"
    >
      {title}
    </h2>
  );
}
