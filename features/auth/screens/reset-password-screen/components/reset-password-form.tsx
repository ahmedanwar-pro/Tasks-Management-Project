'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormError } from '@/components/ui';
import { PasswordRequirements } from './password-requirements';
import { ResetPasswordField } from './reset-password-field';
import { ResetPasswordSuccessMessage } from './reset-password-success-message';
import { useResetPasswordMutation } from '../hooks/use-reset-password-mutation';
import { resetPasswordSchema } from '../utils';
import type { ResetPasswordFormValues } from '../utils';

export function ResetPasswordForm(): ReactElement {
  const router = useRouter();
  const {
    error: resetPasswordError,
    isPending: isResetPasswordPending,
    isSuccess: isResetPasswordSuccess,
    mutate: resetPassword,
    reset: resetResetPassword,
  } = useResetPasswordMutation();
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(resetPasswordSchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- React Hook Form watch("newPassword") is required for the live requirements list.
  const newPasswordValue = watch('newPassword');
  const areFieldsDisabled = isResetPasswordPending || isResetPasswordSuccess;

  useEffect(() => {
    if (!isResetPasswordSuccess) {
      return;
    }

    const redirectTimerId = window.setTimeout(() => {
      router.push('/login');
    }, 3000);

    return () => window.clearTimeout(redirectTimerId);
  }, [isResetPasswordSuccess, router]);

  function handleFieldChange() {
    if (resetPasswordError) {
      resetResetPassword();
    }
  }

  function handleResetPassword({ newPassword }: ResetPasswordFormValues) {
    resetResetPassword();
    resetPassword({ password: newPassword });
  }

  return (
    <form
      aria-label="Set a new password"
      className="flex w-full flex-col gap-6 md:mt-10"
      noValidate
      onChange={handleFieldChange}
      onSubmit={handleSubmit(handleResetPassword)}
    >
      <div className="flex w-full flex-col gap-4 md:gap-6">
        <ResetPasswordField
          disabled={areFieldsDisabled}
          error={errors.newPassword?.message}
          label="New Password"
          registration={register('newPassword')}
          showVisibilityToggle
        />
        <ResetPasswordField
          disabled={areFieldsDisabled}
          error={errors.confirmPassword?.message}
          label="Confirm Password"
          registration={register('confirmPassword')}
          showVisibilityToggle
        />
      </div>

      <PasswordRequirements passwordValue={newPasswordValue} />

      {resetPasswordError ? (
        <FormError message={resetPasswordError.message} />
      ) : null}

      {isResetPasswordSuccess ? <ResetPasswordSuccessMessage /> : null}

      <Button
        className="text-body-md h-(--control-height-xl) rounded-xs bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] leading-relaxed md:h-(--control-height-2xl)! md:bg-[linear-gradient(172.43255399305872deg,var(--color-primary)_0%,var(--color-primary-container)_100%)]"
        disabled={isResetPasswordSuccess}
        fullWidth
        isLoading={isResetPasswordPending}
        loadingText="Updating password"
        size="md"
        type="submit"
      >
        Update Password
      </Button>

      <Link
        className="text-body-sm leading-base text-primary focus-visible:outline-primary mt-2 self-center font-medium underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-offset-2 md:mt-0 md:text-[13px] md:leading-[19.5px]"
        href="/login"
      >
        Back to Log In
      </Link>
    </form>
  );
}
