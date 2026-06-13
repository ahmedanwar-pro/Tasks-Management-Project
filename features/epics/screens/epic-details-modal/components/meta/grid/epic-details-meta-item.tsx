import type { ReactElement, ReactNode } from 'react';
import { EpicDetailsMetaField } from '../epic-details-meta-field';

type EpicDetailsMetaItemProps = {
  children: ReactNode;
  label: string;
};

export function EpicDetailsMetaItem({
  children,
  label,
}: EpicDetailsMetaItemProps): ReactElement {
  return <EpicDetailsMetaField label={label}>{children}</EpicDetailsMetaField>;
}
