import type { ReactElement } from 'react';
import { Button } from '@/components/ui';

type TaskDetailsTabletFooterProps = {
  onClose: () => void;
};

export function TaskDetailsTabletFooter({
  onClose,
}: TaskDetailsTabletFooterProps): ReactElement {
  return (
    <footer className="bg-surface-low flex h-[68px] shrink-0 items-center justify-end gap-3 px-8 py-4">
      <Button onClick={onClose} size="sm" variant="primary">
        Close
      </Button>
    </footer>
  );
}
