'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '@/components/ui';
import { AuthSubmitButton, EmailField } from '../../../components';
import { RememberMeField } from './remember-me-field';
import { PasswordField } from './password-field';
import { useLoginMutation } from '../hooks/use-login-mutation';
import { loginSchema } from '../utils';
import type { LoginFormValues } from '../utils';

export function LoginForm(): ReactElement {
  const router = useRouter();
  const {
    error: loginError,
    isPending: isLoginPending,
    mutate: login,
    reset: resetLogin,
  } = useLoginMutation();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  function handleFieldChange() {
    if (loginError) {
      resetLogin();
    }
  }

  function handleLogin({ email, password, rememberMe }: LoginFormValues) {
    resetLogin();

    login(
      { email, password, rememberMe },
      {
        onSuccess: () => router.push('/projects'),
      },
    );
  }

  return (
    <form
      className="flex flex-col gap-6 pb-4"
      noValidate
      onChange={handleFieldChange}
      onSubmit={handleSubmit(handleLogin)}
    >
      <EmailField
        error={errors.email?.message}
        registration={register('email')}
      />
      <PasswordField
        error={errors.password?.message}
        registration={register('password')}
      />

      <div className="flex items-center justify-between gap-4">
        <RememberMeField registration={register('rememberMe')} />
        <Link
          className="text-body-sm leading-base text-primary focus-visible:outline-primary w-fit font-semibold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-offset-2"
          href="/forgot-password"
        >
          Forgot password?
        </Link>
      </div>

      {loginError ? <FormError message={loginError.message} /> : null}

      <AuthSubmitButton isLoading={isLoginPending}>Log in</AuthSubmitButton>
    </form>
  );
}
