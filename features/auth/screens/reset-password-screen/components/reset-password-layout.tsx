import type { ReactElement, ReactNode } from 'react';
import { Logo } from '@/components/ui';

type ResetPasswordLayoutProps = {
  children: ReactNode;
};

export function ResetPasswordLayout({
  children,
}: ResetPasswordLayoutProps): ReactElement {
  return (
    <main className="text-text-primary relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_275.77px_630.39px_at_center,var(--color-primary)_1.4731%,rgba(0,61,155,0)_1.4731%),linear-gradient(90deg,#f0f1f5_0%,#f0f1f5_100%)] font-sans md:bg-[linear-gradient(90deg,#f0f1f5_0%,#f0f1f5_100%)]">
      <header className="absolute top-0 left-0 z-10 flex h-20 w-full items-center px-6 md:px-10">
        <Logo />
      </header>

      <section className="relative flex min-h-screen justify-center px-6 pt-26 pb-24 md:items-center md:px-6 md:py-[105.75px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="border-primary/5 absolute top-[182.88px] -left-12 size-64 rounded-lg border md:top-64" />
          <div className="absolute right-[-131.72px] bottom-[147.15px] flex size-[455.447px] items-center justify-center md:bottom-[220.27px]">
            <div className="border-primary/5 size-96 rotate-12 rounded-sm border" />
          </div>
          <div className="absolute top-1/2 left-1/2 size-200 -translate-x-1/2 -translate-y-1/2 rounded-lg opacity-2 blur-[32px]" />
        </div>

        {children}
      </section>
    </main>
  );
}
