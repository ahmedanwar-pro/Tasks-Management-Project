import type { ReactElement } from 'react';
import { Badge, Button, Card, Logo } from '@/components/ui';

function ProjectInvitationIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="h-[9.333px] w-[11.667px] shrink-0"
      fill="none"
      focusable="false"
      viewBox="0 0 12 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="8" rx="1" stroke="currentColor" width="8" x="0.5" y="1" />
      <path
        d="m8.5 3 3-1.5v7L8.5 7V3Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AcceptInvitationScreen(): ReactElement {
  return (
    <main className="bg-background text-text-primary relative flex min-h-dvh items-center justify-center overflow-x-hidden px-6 py-12 font-sans md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_1810px_1448px_at_top_left,var(--color-primary-container-muted)_0%,rgba(215,226,255,0)_50%),radial-gradient(ellipse_1810px_1448px_at_bottom_right,var(--color-surface-low)_0%,rgba(241,243,255,0)_50%)]"
      />

      <div className="relative flex w-full max-w-xl flex-col items-center gap-8 md:gap-12">
        <Logo
          className="[&>span]:text-[24px] [&>span]:leading-title"
          size="md"
        />

        <Card
          aria-labelledby="accept-invitation-title"
          as="section"
          className="relative w-full border-0 p-8 shadow-[0px_24px_48px_-12px_rgba(4,27,60,0.06)] md:p-12"
          padding="none"
        >
          <div
            aria-hidden="true"
            className="from-primary to-primary-container absolute inset-x-0 top-0 h-1 bg-gradient-to-r"
          />

          <div className="flex flex-col items-center">
            <Badge
              className="bg-surface-high text-text-secondary gap-1.5 border-0 px-3 py-1 text-[11px] leading-[16.5px]! tracking-[0.55px] uppercase"
              shape="pill"
              variant="custom"
            >
              <ProjectInvitationIcon />
              <span className="flex h-[17px] w-[158.88px] items-center justify-center">
                New Project Invitation
              </span>
            </Badge>

            <h1
              className="text-text-primary max-w-[413px] pt-6 pb-4 text-center text-[28px] leading-8 font-semibold tracking-[-0.7px] md:text-[30px] md:leading-9 md:tracking-[-0.75px]"
              id="accept-invitation-title"
            >
              You&apos;ve been invited to join new project
            </h1>

            <Button
              className="h-[52px]! rounded-xs border-0 bg-[linear-gradient(173.817deg,var(--color-primary)_0%,var(--color-primary-container)_100%)]! shadow-[0px_10px_15px_-3px_rgba(0,61,155,0.2),0px_4px_6px_-4px_rgba(0,61,155,0.2)]! hover:bg-[linear-gradient(173.817deg,var(--color-primary-container)_0%,var(--color-primary)_100%)]!"
              fullWidth
              size="md"
              type="button"
            >
              Accept Invitation
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
