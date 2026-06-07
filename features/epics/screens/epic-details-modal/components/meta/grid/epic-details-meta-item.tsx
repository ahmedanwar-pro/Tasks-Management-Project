import type { ReactElement, ReactNode } from 'react';

type EpicDetailsMetaItemProps = {
  children: ReactNode;
  label: string;
};

export function EpicDetailsMetaItem({
  children,
  label,
}: EpicDetailsMetaItemProps): ReactElement {
  return (
    <section className="flex min-w-0 flex-col gap-2 md:gap-[8.5px]">
      <h3 className="text-[11px] font-bold uppercase leading-[16.5px] tracking-[0.55px] text-text-tertiary md:text-label-sm md:leading-compact md:tracking-normal md:text-text-primary/40">
        {label}
      </h3>
      {children}
    </section>
  );
}
