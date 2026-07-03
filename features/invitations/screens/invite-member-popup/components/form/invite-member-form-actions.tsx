import type { ReactElement } from 'react';
import { Button } from '@/components/ui';

type InviteMemberFormActionsProps = {
  isSubmitting: boolean;
  onCancel: () => void;
};

export function InviteMemberFormActions({
  isSubmitting,
  onCancel,
}: InviteMemberFormActionsProps): ReactElement {
  return (
    <div className="mt-[38px] flex flex-col gap-3 md:mt-10 md:flex-row md:justify-end md:gap-3">
      <Button
        className="text-text-secondary md:text-text-tertiary order-1 h-11 rounded-md font-medium md:order-none md:h-12 md:w-[186px] md:rounded-xs md:font-semibold"
        onClick={onCancel}
        type="button"
        variant="secondary"
      >
        Cancel
      </Button>
      <Button
        className="h-[52px] rounded-md bg-[linear-gradient(137.12deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[linear-gradient(137.12deg,var(--color-primary-container)_0%,var(--color-primary)_100%)] md:h-12 md:w-[186px] md:rounded-xs md:bg-[linear-gradient(165.53deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] md:shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] md:hover:bg-[linear-gradient(165.53deg,var(--color-primary-container)_0%,var(--color-primary)_100%)]"
        isLoading={isSubmitting}
        type="submit"
      >
        Send Invitation
      </Button>
    </div>
  );
}
