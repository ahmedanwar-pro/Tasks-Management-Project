import type { Metadata } from 'next';
import { ResetPasswordScreen } from '@/features/auth/screens/reset-password-screen/reset-password-screen';

export const metadata: Metadata = {
  title: 'Reset password | TASKLY',
};

export default function ResetPasswordPage() {
  return <ResetPasswordScreen />;
}
