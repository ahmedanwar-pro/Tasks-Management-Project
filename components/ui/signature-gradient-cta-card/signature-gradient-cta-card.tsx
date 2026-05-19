import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { joinClasses } from '../utils';

type SignatureGradientCtaCardProps = {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className' | 'title'>;

function SparkleIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-icon-lg shrink-0"
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3 13.8 8.2 19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"
        fill="currentColor"
      />
      <path d="M5 4v3M3.5 5.5h3M19 16v4M17 18h4" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

export function SignatureGradientCtaCard({
  title = 'Signature Gradient CTA',
  description = (
    <>
      Elevated depth with 135-degree
      <br />
      primary-to-container flow.
    </>
  ),
  icon = <SparkleIcon />,
  className,
  ...props
}: SignatureGradientCtaCardProps): ReactElement {
  return (
    <article
      {...props}
      className={joinClasses(
        'flex min-h-[272px] flex-col items-start justify-between rounded-md bg-gradient-to-br from-primary to-primary-container p-8 font-sans tracking-normal text-text-inverse',
        className,
      )}
    >
      <div className="flex h-[33px] items-start text-text-inverse">{icon}</div>
      <div className="flex flex-col gap-2">
        <h3 className="text-title-md font-bold leading-[22.5px] text-text-inverse">
          {title}
        </h3>
        <p className="text-label-md font-normal leading-tight text-text-inverse opacity-70">
          {description}
        </p>
      </div>
    </article>
  );
}

export type { SignatureGradientCtaCardProps };
