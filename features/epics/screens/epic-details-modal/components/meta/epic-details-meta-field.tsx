import type { ReactElement, ReactNode } from 'react';
import { EpicDetailsFieldLabel } from './epic-details-field-label';

type EpicDetailsMetaFieldProps = {
  action?: ReactNode;
  children: ReactNode;
  label: string;
};

export function EpicDetailsMetaField({
  action,
  children,
  label,
}: EpicDetailsMetaFieldProps): ReactElement {
  return (
    <section className="flex min-w-0 flex-col gap-2 md:gap-[8.5px]">
      <EpicDetailsFieldLabel action={action}>{label}</EpicDetailsFieldLabel>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
