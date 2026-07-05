import type { ReactElement } from 'react';
import { AuthScreenLayout } from '../../components';
import { LoginFooter, LoginForm, LoginIntro } from './components';

type LoginScreenProps = {
  returnTo?: string;
};

export function LoginScreen({ returnTo }: LoginScreenProps): ReactElement {
  return (
    <AuthScreenLayout>
      <LoginIntro />
      <LoginForm returnTo={returnTo} />
      <LoginFooter />
    </AuthScreenLayout>
  );
}
