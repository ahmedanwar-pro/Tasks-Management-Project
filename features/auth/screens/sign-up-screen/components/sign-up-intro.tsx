import type { ReactElement } from 'react';
import { AuthIntro } from '../../../components';

export function SignUpIntro(): ReactElement {
  return (
    <AuthIntro
      description={
        <>
          <span className="md:hidden">
            Join the curated environment for institutional trust and task
            precision.
          </span>
          <span className="hidden md:inline">
            Join the editorial approach to task management.
          </span>
        </>
      }
      title="Create your workspace"
    />
  );
}
