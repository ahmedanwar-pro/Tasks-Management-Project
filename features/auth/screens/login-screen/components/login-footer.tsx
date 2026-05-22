import Link from 'next/link';
import type { ReactElement } from 'react';

export function LoginFooter(): ReactElement {
  return (
    <p className="text-body-sm leading-base text-text-secondary md:text-text-tertiary flex justify-center gap-1 pt-[47.5px] pb-8 text-center md:pt-8 md:pb-0">
      <span>Don&apos;t have an account?</span>
      <Link
        className="text-primary focus-visible:outline-primary font-semibold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-offset-2"
        href="/sign-up"
      >
        Sign up
      </Link>
    </p>
  );
}
