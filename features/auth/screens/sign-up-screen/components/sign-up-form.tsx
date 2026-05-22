'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormError } from '@/components/ui';
import { EmailField } from '../../../components';
import { ConfirmPasswordField } from './confirm-password-field';
import { JobTitleField } from './job-title-field';
import { NameField } from './name-field';
import { PasswordField } from './password-field';
import { PasswordHints } from './password-hints';
import { useSignUpMutation } from '../hooks/use-sign-up-mutation';
import { signUpSchema } from '../utils';
import type { SignUpFormValues } from '../utils';

export function SignUpForm(): ReactElement {
  const router = useRouter();
  const {
    error: signUpError,
    isPending: isSignUpPending,
    mutate: signUp,
    reset: resetSignUp,
  } = useSignUpMutation();

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      jobTitle: '',
      name: '',
      password: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- React Hook Form watch("password") is required for the live checklist.
  const passwordValue = watch('password');

  function handleFieldChange() {
    if (signUpError) {
      resetSignUp();
    }
  }

  function handleSignUp({ email, jobTitle, name, password }: SignUpFormValues) {
    resetSignUp();

    signUp(
      {
        department: jobTitle,
        email,
        name,
        password,
      },
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
      onSubmit={handleSubmit(handleSignUp)}
    >
      <NameField error={errors.name?.message} registration={register('name')} />
      <EmailField
        error={errors.email?.message}
        registration={register('email')}
      />
      <JobTitleField
        error={errors.jobTitle?.message}
        registration={register('jobTitle')}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
        <PasswordField
          error={errors.password?.message}
          registration={register('password')}
        />
        <ConfirmPasswordField
          error={errors.confirmPassword?.message}
          registration={register('confirmPassword')}
        />
      </div>

      <PasswordHints passwordValue={passwordValue} />

      {signUpError ? <FormError message={signUpError.message} /> : null}

      <Button
        className="text-body-md h-(--control-height-2xl) rounded-md leading-relaxed md:h-(--control-height-xl) md:rounded-sm"
        fullWidth
        isLoading={isSignUpPending}
        size="lg"
        type="submit"
      >
        Create Account
      </Button>
    </form>
  );
}
