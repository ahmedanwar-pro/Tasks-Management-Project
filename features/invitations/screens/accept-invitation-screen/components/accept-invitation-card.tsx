import type { ReactElement } from 'react';
import { Badge, Button, Card } from '@/components/ui';
import { AcceptInvitationFeedback } from './accept-invitation-feedback';
import { AcceptInvitationIcon } from './accept-invitation-icon';

type AcceptInvitationCardProps = {
  buttonLabel: string;
  error?: string;
  isButtonDisabled: boolean;
  isButtonLoading: boolean;
  onAccept: () => void;
  success?: string;
};

export function AcceptInvitationCard({
  buttonLabel,
  error,
  isButtonDisabled,
  isButtonLoading,
  onAccept,
  success,
}: AcceptInvitationCardProps): ReactElement {
  return (
    <Card
      aria-labelledby="accept-invitation-title"
      as="section"
      className="relative w-full border-0 p-8 shadow-[0px_24px_48px_-12px_rgba(4,27,60,0.06)] md:p-12"
      padding="none"
    >
      <div
        aria-hidden="true"
        className="from-primary to-primary-container absolute inset-x-0 top-0 h-1 bg-gradient-to-r"
      />

      <div className="flex flex-col items-center">
        <Badge
          className="bg-surface-high text-text-secondary gap-1.5 border-0 px-3 py-1 text-[11px] leading-[16.5px]! tracking-[0.55px] uppercase"
          shape="pill"
          variant="custom"
        >
          <AcceptInvitationIcon />
          <span className="flex h-[17px] w-[158.88px] items-center justify-center">
            New Project Invitation
          </span>
        </Badge>

        <h1
          className="text-text-primary max-w-[413px] pt-6 pb-4 text-center text-[28px] leading-8 font-semibold tracking-[-0.7px] md:text-[30px] md:leading-9 md:tracking-[-0.75px]"
          id="accept-invitation-title"
        >
          You&apos;ve been invited to join new project
        </h1>

        <AcceptInvitationFeedback error={error} success={success} />

        <Button
          className="h-[52px]! rounded-xs border-0 bg-[linear-gradient(173.817deg,var(--color-primary)_0%,var(--color-primary-container)_100%)]! shadow-[0px_10px_15px_-3px_rgba(0,61,155,0.2),0px_4px_6px_-4px_rgba(0,61,155,0.2)]! hover:bg-[linear-gradient(173.817deg,var(--color-primary-container)_0%,var(--color-primary)_100%)]!"
          fullWidth
          disabled={isButtonDisabled}
          isLoading={isButtonLoading}
          onClick={onAccept}
          size="md"
          type="button"
        >
          {buttonLabel}
        </Button>
      </div>
    </Card>
  );
}
