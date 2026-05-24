import Link from 'next/link';
import type { ReactElement, ReactNode } from 'react';

type AuthFooterPromptProps = {
  href: string;
  linkLabel: ReactNode;
  prompt: ReactNode;
};

export function AuthFooterPrompt({
  href,
  linkLabel,
  prompt,
}: AuthFooterPromptProps): ReactElement {
  return (
    <p className="text-body-sm leading-base text-text-secondary md:text-text-tertiary flex justify-center gap-1 pt-[47.5px] pb-8 text-center md:pt-8 md:pb-0">
      <span>{prompt}</span>
      <Link
        className="text-primary focus-visible:outline-primary font-semibold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-offset-2"
        href={href}
      >
        {linkLabel}
      </Link>
    </p>
  );
}
