import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui';

export function ProjectEpicLoadingDesktopMetadata(): ReactElement {
  return (
    <div className="border-surface-low hidden border-t pt-4.25 lg:flex lg:items-center lg:justify-between">
      <Skeleton
        animated={false}
        className="bg-surface-muted h-3! w-28! bg-none"
        radius="xs"
      />
      <Skeleton
        animated={false}
        className="bg-surface-muted h-3! w-20! bg-none"
        radius="xs"
      />
    </div>
  );
}
