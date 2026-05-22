import type { Metadata } from 'next';
import { LoginScreen } from '@/features/auth/screens/login-screen/login-screen';

export const metadata: Metadata = {
  title: 'Log in | TASKLY',
};

export default function LoginPage() {
  return <LoginScreen />;
}
