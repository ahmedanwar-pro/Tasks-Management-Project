import type { Metadata } from 'next';
import { SignUpScreen } from '@/features/auth/screens/sign-up-screen/sign-up-screen';

export const metadata: Metadata = {
  title: 'Create your workspace | TASKLY',
};

export default function SignUpPage() {
  return <SignUpScreen />;
}
