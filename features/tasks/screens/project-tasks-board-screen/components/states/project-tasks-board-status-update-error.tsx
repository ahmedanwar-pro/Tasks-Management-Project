import type { ReactElement } from 'react';
import { FormError } from '@/components/ui';

export function ProjectTasksBoardStatusUpdateError(): ReactElement {
  return (
    <FormError
      className="sticky left-0 mb-4 w-full"
      message="Failed to update task status. The task was moved back. Please try again."
    />
  );
}
