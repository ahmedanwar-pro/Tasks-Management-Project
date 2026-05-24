import type { ReactElement } from 'react';
import { AuthFooterPrompt } from '../../../components';

export function SignUpFooter(): ReactElement {
  return (
    <AuthFooterPrompt
      href="/login"
      linkLabel="Log in"
      prompt="Already have an account?"
    />
  );
}
