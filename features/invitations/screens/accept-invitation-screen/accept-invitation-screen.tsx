'use client';

import type { ReactElement } from 'react';
import { Logo } from '@/components/ui';
import { AcceptInvitationCard } from './components';
import { useAcceptInvitationFlow } from './hooks';

type AcceptInvitationScreenProps = {
  invitationToken?: string;
};

export function AcceptInvitationScreen({
  invitationToken,
}: AcceptInvitationScreenProps): ReactElement {
  const {
    accept,
    buttonLabel,
    errorMessage,
    isButtonDisabled,
    isButtonLoading,
    successMessage,
  } = useAcceptInvitationFlow(invitationToken);

  return (
    <main className="bg-background text-text-primary relative flex min-h-dvh items-center justify-center overflow-x-hidden px-6 py-12 font-sans md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_1810px_1448px_at_top_left,var(--color-primary-container-muted)_0%,rgba(215,226,255,0)_50%),radial-gradient(ellipse_1810px_1448px_at_bottom_right,var(--color-surface-low)_0%,rgba(241,243,255,0)_50%)]"
      />

      <div className="relative flex w-full max-w-xl flex-col items-center gap-8 md:gap-12">
        <Logo
          className="[&>span]:leading-title [&>span]:text-[24px]"
          size="md"
        />

        <AcceptInvitationCard
          buttonLabel={buttonLabel}
          error={errorMessage}
          isButtonDisabled={isButtonDisabled}
          isButtonLoading={isButtonLoading}
          onAccept={accept}
          success={successMessage}
        />
      </div>
    </main>
  );
}
