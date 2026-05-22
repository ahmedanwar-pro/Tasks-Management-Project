import type { ReactElement } from 'react';
import { AuthScreenLayout } from '../../components';
import { LoginFooter, LoginForm, LoginIntro } from './components';

export function LoginScreen(): ReactElement {
  return (
    <AuthScreenLayout>
      <LoginIntro />
      <LoginForm />
      <LoginFooter />
    </AuthScreenLayout>
  );
}
