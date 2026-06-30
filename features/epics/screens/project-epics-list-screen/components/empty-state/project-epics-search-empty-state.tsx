import type { ReactElement } from 'react';
import { EmptyState } from '@/components/ui';

export function ProjectEpicsSearchEmptyState(): ReactElement {
  return (
    <EmptyState
      aria-live="polite"
      className="mt-6 flex-1"
      role="status"
      title="No epics found matching your search"
      variant="plain"
    />
  );
}
