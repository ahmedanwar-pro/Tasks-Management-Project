import type { ReactElement } from 'react';
import { AuthIntro } from '../../../components';

export function LoginIntro(): ReactElement {
  return (
    <AuthIntro
      description="Log in to manage your projects and tasks."
      title="Welcome back"
    />
  );
}
