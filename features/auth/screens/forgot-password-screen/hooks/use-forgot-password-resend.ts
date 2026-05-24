'use client';

import { useEffect, useState } from 'react';
import { useForgotPasswordMutation } from './use-forgot-password-mutation';

const resendDelayMilliseconds = 5 * 60 * 1000;
const maxResendTrials = 3;

function getResetPasswordRedirectUrl() {
  return new URL('/reset-password', window.location.origin).toString();
}

function formatTime(milliseconds: number) {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

type ResetEmailRequest = {
  email: string;
  sentAt: number;
};

type ResendState = {
  requestSentAt: number;
  trials: number;
  availableAt: number;
};

export function useForgotPasswordResend(
  resetEmailRequest: ResetEmailRequest | undefined,
) {
  const [resendState, setResendState] = useState<ResendState>({
    availableAt: 0,
    requestSentAt: 0,
    trials: 0,
  });
  const [now, setNow] = useState(() => Date.now());
  const {
    error: resendError,
    isPending: isResendPending,
    mutate: resendResetEmail,
    reset: resetResend,
  } = useForgotPasswordMutation();

  const currentResendState =
    resetEmailRequest && resendState.requestSentAt === resetEmailRequest.sentAt
      ? resendState
      : {
          availableAt:
            (resetEmailRequest?.sentAt ?? now) + resendDelayMilliseconds,
          requestSentAt: resetEmailRequest?.sentAt ?? 0,
          trials: 0,
        };
  const resendWaitTime = Math.max(currentResendState.availableAt - now, 0);
  const hasResendTrials = currentResendState.trials < maxResendTrials;
  const canResend =
    Boolean(resetEmailRequest) &&
    resendWaitTime === 0 &&
    hasResendTrials &&
    !isResendPending;
  const resendLabel = hasResendTrials
    ? resendWaitTime > 0
      ? `Resend in ${formatTime(resendWaitTime)}`
      : 'Resend'
    : 'Resend limit reached';

  useEffect(() => {
    if (!resetEmailRequest || resendWaitTime === 0) {
      return;
    }

    const timerId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [resetEmailRequest, resendWaitTime]);

  function resend() {
    if (!resetEmailRequest || !canResend) {
      return;
    }

    resetResend();
    setResendState(currentResendState);
    resendResetEmail(
      {
        email: resetEmailRequest.email,
        redirectTo: getResetPasswordRedirectUrl(),
      },
      {
        onSuccess: () => {
          const nextSentAt = Date.now();

          setNow(nextSentAt);
          setResendState((previousResendState) => ({
            availableAt: nextSentAt + resendDelayMilliseconds,
            requestSentAt: resetEmailRequest.sentAt,
            trials:
              previousResendState.requestSentAt === resetEmailRequest.sentAt
                ? previousResendState.trials + 1
                : 1,
          }));
        },
      },
    );
  }

  return {
    canResend,
    hasResendTrials,
    isResendPending,
    isWaitingToResend: Boolean(resetEmailRequest) && resendWaitTime > 0,
    resend,
    resendError:
      resendState.requestSentAt === resetEmailRequest?.sentAt
        ? resendError
        : null,
    resendLabel,
  };
}
