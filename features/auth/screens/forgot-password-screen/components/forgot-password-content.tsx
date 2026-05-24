'use client';

import { useState } from 'react';
import type { ReactElement } from 'react';
import { ForgotPasswordForm } from './forgot-password-form';
import { ForgotPasswordIntro } from './forgot-password-intro';
import { ForgotPasswordLayout } from './forgot-password-layout';
import {
  DesktopForgotPasswordSuccessState,
  MobileForgotPasswordSuccessState,
} from './forgot-password-success-state';
import { useForgotPasswordResend } from '../hooks/use-forgot-password-resend';

export function ForgotPasswordContent(): ReactElement {
  const [resetEmailRequest, setResetEmailRequest] = useState<{
    email: string;
    sentAt: number;
  }>();
  const resendState = useForgotPasswordResend(resetEmailRequest);
  const resendProps = {
    canResend: resendState.canResend,
    hasResendTrials: resendState.hasResendTrials,
    isResendPending: resendState.isResendPending,
    onResend: resendState.resend,
    resendError: resendState.resendError?.message,
    resendLabel: resendState.resendLabel,
  };

  const desktopSuccessState = resetEmailRequest ? (
    <DesktopForgotPasswordSuccessState {...resendProps} />
  ) : null;
  const mobileSuccessState = resetEmailRequest ? (
    <MobileForgotPasswordSuccessState {...resendProps} />
  ) : null;

  return (
    <ForgotPasswordLayout
      desktopSuccessState={desktopSuccessState}
      mobileSuccessState={mobileSuccessState}
    >
      <ForgotPasswordIntro />

      <div className="flex w-full flex-col items-center md:gap-6">
        <ForgotPasswordForm
          isSendDisabled={resendState.isWaitingToResend}
          onFieldChange={() => setResetEmailRequest(undefined)}
          onSuccess={(email) =>
            setResetEmailRequest({ email, sentAt: Date.now() })
          }
        />
      </div>
    </ForgotPasswordLayout>
  );
}
