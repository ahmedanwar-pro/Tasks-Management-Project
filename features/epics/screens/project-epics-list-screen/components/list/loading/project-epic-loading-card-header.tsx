import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui';

export function ProjectEpicLoadingCardHeader(): ReactElement {
  return (
    <div className="flex items-start justify-between">
      <Skeleton
        animated={false}
        className="bg-surface-muted h-6.25! w-33.5! bg-none opacity-60 lg:w-18! xl:h-5.75! xl:w-20!"
        radius="sm"
      />
      <Skeleton
        animated={false}
        className="bg-surface-muted h-1! w-4! bg-none xl:h-4! xl:w-1!"
        radius="xs"
        variant="block"
      />
    </div>
  );
}
