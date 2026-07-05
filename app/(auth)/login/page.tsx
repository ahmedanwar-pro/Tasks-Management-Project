import type { Metadata } from 'next';
import { LoginScreen } from '@/features/auth/screens/login-screen/login-screen';
import { getSafeLoginReturnUrl } from '@/features/auth/screens/login-screen/utils';

export const metadata: Metadata = {
  title: 'Log in | TASKLY',
};

type LoginPageProps = {
  searchParams: Promise<{
    returnTo?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { returnTo } = await searchParams;
  const requestedReturnUrl = Array.isArray(returnTo) ? returnTo[0] : returnTo;

  return (
    <LoginScreen returnTo={getSafeLoginReturnUrl(requestedReturnUrl?.trim())} />
  );
}
