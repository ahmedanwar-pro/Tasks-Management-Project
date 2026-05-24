import type { ReactElement } from 'react';
import { ResetPasswordContent, ResetPasswordLayout } from './components';

export function ResetPasswordScreen(): ReactElement {
  return (
    <ResetPasswordLayout>
      <ResetPasswordContent />
    </ResetPasswordLayout>
  );
}
