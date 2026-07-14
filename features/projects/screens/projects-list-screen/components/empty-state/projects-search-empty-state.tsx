import type { ReactElement } from 'react';
import { EmptyState } from '@/components/ui';

export function ProjectsSearchEmptyState(): ReactElement {
  return (
    <EmptyState
      aria-live="polite"
      className="mt-6 flex-1"
      role="status"
      title="No projects found matching your search"
      variant="plain"
    />
  );
}
