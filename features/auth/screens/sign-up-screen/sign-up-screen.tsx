import type { ReactElement } from 'react';
import { AuthScreenLayout } from '../../components';
import { SignUpFooter, SignUpForm, SignUpIntro } from './components';

export function SignUpScreen(): ReactElement {
  return (
    <AuthScreenLayout>
      <SignUpIntro />
      <SignUpForm />
      <SignUpFooter />
    </AuthScreenLayout>
  );
}
