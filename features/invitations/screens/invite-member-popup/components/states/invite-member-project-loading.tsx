import type { ReactElement } from 'react';
import { Modal, Spinner } from '@/components/ui';

type InviteMemberProjectLoadingProps = {
  onClose: () => void;
};

export function InviteMemberProjectLoading({
  onClose,
}: InviteMemberProjectLoadingProps): ReactElement {
  return (
    <Modal
      aria-busy="true"
      aria-label="Loading project details"
      bodyClassName="!p-0"
      className="h-[460px] shadow-[0px_-4px_12px_rgba(4,27,60,0.06)] md:h-[385px] md:shadow-[0px_24px_48px_-12px_rgba(4,27,60,0.12)]"
      initialFocus="container"
      onClose={onClose}
      open
      overlayClassName="backdrop-blur-[2px] bg-text-primary/40 md:backdrop-blur-[6px]"
      placement="responsive"
      size="responsive-sm"
    >
      <div
        aria-live="polite"
        className="relative flex h-full flex-col items-center justify-center gap-4 px-8 text-center"
        role="status"
      >
        <span
          aria-hidden="true"
          className="bg-border-muted/30 absolute top-8 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-lg md:hidden"
        />
        <Spinner className="text-primary" size="lg" />
        <p className="text-body-sm leading-base text-text-secondary font-medium">
          Loading project...
        </p>
      </div>
    </Modal>
  );
}
