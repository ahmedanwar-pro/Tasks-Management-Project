import type { ReactElement } from 'react';
import { Button, FormError } from '@/components/ui';
import { TimerIcon } from './forgot-password-icons';
import { ForgotPasswordSuccessMessage } from './forgot-password-success-message';

type ForgotPasswordSuccessStateProps = {
  canResend: boolean;
  hasResendTrials: boolean;
  isResendPending: boolean;
  resendError?: string;
  resendLabel: string;
  onResend: () => void;
};

export function MobileForgotPasswordSuccessState({
  canResend,
  resendError,
  resendLabel,
  onResend,
}: ForgotPasswordSuccessStateProps): ReactElement {
  return (
    <section
      aria-label="Password reset email status"
      className="bg-success/30 text-success-icon w-full rounded-sm p-4 shadow-[0px_24px_48px_-12px_rgba(4,27,60,0.06)] backdrop-blur-[6px] md:hidden"
    >
      <div className="flex items-start gap-3">
        <ForgotPasswordSuccessMessage variant="mobile" />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-[rgba(0,82,53,0.1)] pt-3">
        <p className="text-[11px] leading-[16.5px] font-bold tracking-[1.1px] text-[rgba(0,82,53,0.6)] uppercase">
          Didn&apos;t receive email?
        </p>
        <button
          className="focus-visible:outline-primary text-primary disabled:text-primary/60 shrink-0 text-[11px] leading-[16.5px] font-bold tracking-[1.1px] uppercase focus-visible:outline focus-visible:outline-offset-2 disabled:cursor-not-allowed"
          disabled={!canResend}
          onClick={onResend}
          type="button"
        >
          {resendLabel}
        </button>
      </div>

      {resendError ? (
        <FormError className="mt-3" message={resendError} />
      ) : null}
    </section>
  );
}

export function DesktopForgotPasswordSuccessState({
  canResend,
  hasResendTrials,
  isResendPending,
  resendError,
  resendLabel,
  onResend,
}: ForgotPasswordSuccessStateProps): ReactElement {
  return (
    <section
      aria-label="Password reset email status"
      className="hidden w-full border-t border-[rgba(195,198,214,0.15)] pt-10.25 md:block"
    >
      <div className="bg-success/20 text-success-icon flex items-start gap-3 rounded-md p-4">
        <ForgotPasswordSuccessMessage variant="desktop" />
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <p className="text-text-secondary text-[11px] leading-[16.5px] font-bold tracking-[0.55px] uppercase">
          Didn&apos;t receive the email?
        </p>

        <Button
          className="text-body-md h-(--control-height-xl) rounded-sm leading-relaxed"
          disabled={!canResend}
          fullWidth
          iconLeft={!canResend && hasResendTrials ? <TimerIcon /> : undefined}
          isLoading={isResendPending}
          loadingText="Sending reset link"
          onClick={onResend}
          size="md"
          style={{ height: 'var(--control-height-xl)' }}
          type="button"
          variant="tonal"
        >
          {resendLabel}
        </Button>

        {resendError ? <FormError message={resendError} /> : null}
      </div>
    </section>
  );
}
