import type { ReactElement } from 'react';
import { AuthFooterPrompt } from '../../../components';

export function LoginFooter(): ReactElement {
  return (
    <AuthFooterPrompt
      href="/sign-up"
      linkLabel="Sign up"
      prompt="Don't have an account?"
    />
  );
}
