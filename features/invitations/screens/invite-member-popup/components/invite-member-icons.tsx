import type { ReactElement, SVGProps } from 'react';

export function InvitePersonIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.14 0-7.5 2.01-7.5 4.5V20h12.1a5.98 5.98 0 0 1-.1-1c0-2.05 1.03-3.86 2.6-4.94A14.2 14.2 0 0 0 9.5 13Z"
        fill="currentColor"
      />
      <path
        d="M19 15v3m0 0v3m0-3h3m-3 0h-3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" {...props}>
      <path
        d="m3 5 7 5 7-5M3 5h14v10H3V5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" {...props}>
      <path
        d="m4 4 12 12M16 4 4 16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
