import type { ReactElement } from 'react';
import { Card, Skeleton } from '@/components/ui';

export function ProjectsLoadingCard(): ReactElement {
  return (
    <Card
      className="lg:border-border-subtle! flex h-52.75 flex-col gap-4 p-5 lg:h-62.5 lg:p-6.25 lg:shadow-sm"
      padding="none"
    >
      <Skeleton
        animated={false}
        className="bg-surface-muted hidden h-32 w-full bg-none lg:block"
        fullWidth
        radius="sm"
        variant="block"
      />
      <Skeleton
        animated={false}
        className="bg-surface-muted h-6 w-[60%] bg-none lg:w-3/4"
        radius="xs"
        variant="line"
      />
      <Skeleton
        animated={false}
        className="bg-surface-muted h-4 w-[40%] bg-none lg:w-1/2"
        radius="xs"
        variant="line"
      />
      <Skeleton
        animated={false}
        className="bg-surface-muted mt-auto h-4 w-[32%] bg-none lg:hidden"
        radius="xs"
        variant="line"
      />
    </Card>
  );
}
