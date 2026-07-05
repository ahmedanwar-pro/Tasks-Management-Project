'use client';

import type { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type UseAcceptInvitationRedirectsOptions = {
  hasInvitationToken: boolean;
  invitationToken?: string;
  isAccepted: boolean;
  isSessionPending: boolean;
  isUnauthorizedError: boolean;
  session: Session | null;
  sessionError: Error | null;
};

const successRedirectDelayMs = 1500;
const successDestination = '/projects';

function getInviteLoginUrl(): string {
  const inviteUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  return `/login?${new URLSearchParams({ returnTo: inviteUrl }).toString()}`;
}

export function useAcceptInvitationRedirects({
  hasInvitationToken,
  invitationToken,
  isAccepted,
  isSessionPending,
  isUnauthorizedError,
  session,
  sessionError,
}: UseAcceptInvitationRedirectsOptions): void {
  const router = useRouter();

  useEffect(() => {
    if (!hasInvitationToken || isSessionPending || session || sessionError) {
      return;
    }

    router.replace(getInviteLoginUrl());
  }, [hasInvitationToken, isSessionPending, router, session, sessionError]);

  useEffect(() => {
    if (!isUnauthorizedError || !invitationToken) {
      return;
    }

    router.replace(getInviteLoginUrl());
  }, [invitationToken, isUnauthorizedError, router]);

  useEffect(() => {
    if (!isAccepted) {
      return;
    }

    const redirectTimer = window.setTimeout(() => {
      router.replace(successDestination);
    }, successRedirectDelayMs);

    return () => window.clearTimeout(redirectTimer);
  }, [isAccepted, router]);
}
