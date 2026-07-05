'use client';

import { useState } from 'react';
import { isAcceptInvitationUnauthorizedError } from '../api';
import { useAcceptInvitationMutation } from './use-accept-invitation-mutation';
import { useAcceptInvitationRedirects } from './use-accept-invitation-redirects';
import { useInvitationSession } from './use-invitation-session';

type AcceptInvitationFlow = {
  accept: () => void;
  buttonLabel: string;
  errorMessage?: string;
  isButtonDisabled: boolean;
  isButtonLoading: boolean;
  successMessage?: string;
};

export function useAcceptInvitationFlow(
  invitationToken?: string,
): AcceptInvitationFlow {
  const hasInvitationToken = Boolean(invitationToken);
  const {
    error: sessionError,
    isPending: isSessionPending,
    retry: retrySession,
    session,
  } = useInvitationSession(hasInvitationToken);
  const [isAccepted, setIsAccepted] = useState(false);
  const {
    error: acceptError,
    isPending: isAcceptPending,
    mutate: acceptInvitation,
    reset: resetAcceptInvitation,
  } = useAcceptInvitationMutation();
  const isUnauthorizedError = isAcceptInvitationUnauthorizedError(acceptError);

  useAcceptInvitationRedirects({
    hasInvitationToken,
    invitationToken,
    isAccepted,
    isSessionPending,
    isUnauthorizedError,
    session,
    sessionError,
  });

  function handleAcceptInvitation(): void {
    if (sessionError) {
      retrySession();
      return;
    }

    if (
      !invitationToken ||
      !session?.access_token ||
      isAcceptPending ||
      isAccepted
    ) {
      return;
    }

    resetAcceptInvitation();
    acceptInvitation(
      { token: invitationToken },
      {
        onSuccess: () => setIsAccepted(true),
      },
    );
  }

  const isRedirectingToLogin =
    hasInvitationToken &&
    !isSessionPending &&
    !sessionError &&
    (!session || isUnauthorizedError);
  const errorMessage = !hasInvitationToken
    ? 'This invitation link is invalid.'
    : sessionError
      ? 'Unable to verify your session. Check your connection and try again.'
      : acceptError && !isUnauthorizedError
        ? acceptError.message
        : undefined;

  return {
    accept: handleAcceptInvitation,
    buttonLabel: sessionError ? 'Try Again' : 'Accept Invitation',
    errorMessage,
    isButtonDisabled:
      !hasInvitationToken || (!session && !sessionError) || isAccepted,
    isButtonLoading:
      isSessionPending || isRedirectingToLogin || isAcceptPending,
    successMessage: isAccepted
      ? 'Invitation accepted successfully. Redirecting…'
      : undefined,
  };
}
