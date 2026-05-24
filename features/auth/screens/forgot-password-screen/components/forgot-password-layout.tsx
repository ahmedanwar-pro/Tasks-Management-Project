import type { ReactElement, ReactNode } from 'react';
import { Logo } from '@/components/ui';

type ForgotPasswordLayoutProps = {
  children: ReactNode;
  desktopSuccessState?: ReactNode;
  mobileSuccessState?: ReactNode;
};

export function ForgotPasswordLayout({
  children,
  desktopSuccessState,
  mobileSuccessState,
}: ForgotPasswordLayoutProps): ReactElement {
  return (
    <main className="text-text-primary relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_275.77px_625.08px_at_center,var(--color-primary-container-muted)_1.7678%,var(--color-background)_1.7678%)] font-sans md:bg-[radial-gradient(ellipse_905.1px_724.08px_at_center,var(--color-primary)_1.4731%,rgba(0,61,155,0)_1.4731%),linear-gradient(90deg,#f0f1f5_0%,#f0f1f5_100%)]">
      <header className="bg-background/80 absolute top-0 left-0 z-10 flex h-16 w-full items-center px-6 backdrop-blur-[6px] md:top-1 md:h-20 md:bg-[#f0f1f5] md:px-10 md:backdrop-blur-none">
        <Logo />
      </header>

      <section className="relative flex min-h-screen justify-center px-6 py-[116.5px] md:mt-21 md:min-h-0 md:items-center md:px-4 md:pt-[60.88px] md:pb-[60.87px]">
        <div
          aria-hidden="true"
          className="border-primary/5 pointer-events-none absolute top-[208.88px] -left-12 hidden size-64 rounded-lg border md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-131.72px] bottom-[173.15px] hidden size-[455.447px] items-center justify-center md:flex"
        >
          <div className="border-primary/5 size-96 rotate-12 rounded-sm border" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 hidden size-200 -translate-x-1/2 -translate-y-1/2 rounded-lg opacity-2 blur-[32px] md:block"
        />

        <div className="flex w-full max-w-md flex-col gap-6 md:gap-8">
          <div className="bg-surface md:border-border-strong flex w-full flex-col items-center rounded-md p-8 shadow-[0px_24px_48px_-12px_rgba(4,27,60,0.06)] md:items-start md:gap-8 md:border md:p-10.25">
            {children}
            {desktopSuccessState}
          </div>

          {mobileSuccessState}
        </div>
      </section>
    </main>
  );
}
