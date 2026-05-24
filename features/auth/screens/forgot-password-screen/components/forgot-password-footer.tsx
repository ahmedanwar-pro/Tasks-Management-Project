import Link from 'next/link';
import type { ReactElement } from 'react';
import { BackArrowIcon } from './forgot-password-icons';

export function ForgotPasswordFooter(): ReactElement {
  return (
    <Link
      className="text-body-sm leading-base text-primary focus-visible:outline-primary mt-6 inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 md:mt-0 md:gap-[3.99px] md:leading-5.25"
      href="/login"
    >
      <BackArrowIcon />
      Back to log in
    </Link>
  );
}
