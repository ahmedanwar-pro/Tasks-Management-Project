'use client';

import { useRouter } from 'next/navigation';
import type { JSX } from 'react';
import { Button, Modal } from '@/components/ui';

type TaskDetailsPopupProps = {
  closeHref: string;
  taskId: string;
};

export function TaskDetailsPopup({
  closeHref,
  taskId,
}: TaskDetailsPopupProps): JSX.Element {
  const router = useRouter();

  function handleClose(): void {
    router.replace(closeHref);
  }

  return (
    <Modal
      bodyClassName="flex flex-col gap-3"
      footer={
        <Button onClick={handleClose} variant="secondary">
          Close
        </Button>
      }
      onClose={handleClose}
      open
      size="md"
      title="Task details"
    >
      <p className="text-body-sm leading-base text-text-secondary">Task ID</p>
      <p className="text-body-md text-text-primary font-semibold break-all">
        {taskId}
      </p>
    </Modal>
  );
}
