import type { Metadata } from 'next';
import { ForgotPasswordScreen } from '@/features/auth/screens/forgot-password-screen/forgot-password-screen';

export const metadata: Metadata = {
  title: 'Forgot password | TASKLY',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordScreen />;
}
