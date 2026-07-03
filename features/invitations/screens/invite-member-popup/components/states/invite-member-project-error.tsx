import type { ReactElement } from 'react';
import { Button, ErrorState, Modal } from '@/components/ui';

type InviteMemberProjectErrorProps = {
  onClose: () => void;
  onRetry: () => void;
};

export function InviteMemberProjectError({
  onClose,
  onRetry,
}: InviteMemberProjectErrorProps): ReactElement {
  return (
    <Modal
      aria-label="Unable to load project"
      bodyClassName="!p-0"
      className="h-[310px] shadow-[0px_-4px_12px_rgba(4,27,60,0.06)] md:h-[280px] md:shadow-[0px_24px_48px_-12px_rgba(4,27,60,0.12)]"
      initialFocus="first-focusable"
      onClose={onClose}
      open
      overlayClassName="backdrop-blur-[2px] bg-text-primary/40 md:backdrop-blur-[6px]"
      placement="responsive"
      size="responsive-sm"
    >
      <section className="relative flex h-full flex-col items-center justify-center px-8 text-center">
        <span
          aria-hidden="true"
          className="bg-border-muted/30 absolute top-8 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-lg md:hidden"
        />
        <ErrorState
          action={
            <div className="flex w-full gap-3">
              <Button
                className="h-11 flex-1 rounded-xs"
                onClick={onClose}
                type="button"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                className="h-11 flex-1 rounded-xs"
                onClick={onRetry}
                type="button"
              >
                Retry
              </Button>
            </div>
          }
          className="w-full max-w-[320px] items-center border-0 bg-transparent text-center shadow-none [&>div]:w-full"
          message="We couldn't load this project right now. Please try again."
          role="alert"
          size="sm"
          title="Something went wrong"
          variant="card"
        />
      </section>
    </Modal>
  );
}
