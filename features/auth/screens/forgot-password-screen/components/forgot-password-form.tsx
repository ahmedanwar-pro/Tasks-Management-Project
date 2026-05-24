'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormError } from '@/components/ui';
import { ForgotPasswordEmailField } from './forgot-password-email-field';
import { ForgotPasswordFooter } from './forgot-password-footer';
import { useForgotPasswordMutation } from '../hooks/use-forgot-password-mutation';
import { forgotPasswordSchema } from '../utils';
import type { ForgotPasswordFormValues } from '../utils';

type ForgotPasswordFormProps = {
  isSendDisabled: boolean;
  onSuccess: (email: string) => void;
  onFieldChange: () => void;
};

export function ForgotPasswordForm({
  isSendDisabled,
  onSuccess,
  onFieldChange,
}: ForgotPasswordFormProps): ReactElement {
  const {
    error: forgotPasswordError,
    isPending: isForgotPasswordPending,
    mutate: sendResetEmail,
    reset: resetForgotPassword,
  } = useForgotPasswordMutation();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
  });

  const emailError = errors.email?.message;

  function handleFieldChange() {
    onFieldChange();

    if (forgotPasswordError) {
      resetForgotPassword();
    }
  }

  function handleForgotPassword({ email }: ForgotPasswordFormValues) {
    resetForgotPassword();

    sendResetEmail(
      {
        email,
        redirectTo: new URL(
          '/reset-password',
          window.location.origin,
        ).toString(),
      },
      {
        onSuccess: () => onSuccess(email),
      },
    );
  }

  return (
    <>
      <form
        className="flex w-full flex-col gap-4 pb-4 md:gap-6 md:pb-0"
        noValidate
        onChange={handleFieldChange}
        onSubmit={handleSubmit(handleForgotPassword)}
      >
        <ForgotPasswordEmailField
          disabled={isForgotPasswordPending}
          error={emailError}
          registration={register('email')}
        />

        {forgotPasswordError ? (
          <FormError message={forgotPasswordError.message} />
        ) : null}

        <Button
          className="text-body-sm leading-base md:text-body-md h-(--control-height-xl) rounded-xs bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] md:rounded-sm md:bg-[linear-gradient(172.528deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] md:leading-relaxed"
          disabled={isSendDisabled}
          fullWidth
          isLoading={isForgotPasswordPending}
          loadingText="Sending reset link"
          size="md"
          style={{ height: 'var(--control-height-xl)' }}
          type="submit"
        >
          Send Reset Link
        </Button>
      </form>

      <ForgotPasswordFooter />
    </>
  );
}
