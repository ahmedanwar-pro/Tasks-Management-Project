import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui';

export function ProjectEpicLoadingCardTitle(): ReactElement {
  return (
    <Skeleton
      animated={false}
      className="bg-surface-muted h-11.25! w-full! bg-none xl:h-7!"
      fullWidth
      radius="xs"
    />
  );
}
