import type { ReactElement } from 'react';
import { Logo } from '@/components/ui';

export function SignUpHeader(): ReactElement {
  return (
    <header className="flex h-20 w-full items-center px-6 md:absolute md:top-0 md:left-0 md:px-10">
      <Logo />
    </header>
  );
}
