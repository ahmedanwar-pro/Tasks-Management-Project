import type { ReactElement } from 'react';

type EpicDetailsDescriptionProps = {
  description: string;
};

export function EpicDetailsDescription({
  description,
}: EpicDetailsDescriptionProps): ReactElement {
  return (
    <section className="flex w-full flex-col gap-2 md:block">
      <h3 className="text-[11px] font-bold uppercase leading-[16.5px] tracking-[0.55px] text-text-tertiary md:hidden">
        Description
      </h3>
      <p className="text-body-sm leading-base text-text-tertiary md:text-body-md md:leading-[26px] md:text-text-primary/80">
        {description}
      </p>
    </section>
  );
}
