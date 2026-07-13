import type { ReactElement, ReactNode } from 'react';
import { AuthHeader } from './auth-header';

type AuthScreenLayoutProps = {
  children: ReactNode;
};

export function AuthScreenLayout({
  children,
}: AuthScreenLayoutProps): ReactElement {
  return (
    <main className="bg-background text-text-primary relative min-h-screen overflow-hidden font-sans">
      <AuthHeader />

      <section className="flex w-full justify-center px-6 pb-4 md:min-h-screen md:items-center md:px-10 md:pt-24 md:pb-12">
        <div className="md:bg-surface w-full max-w-xl md:rounded-md md:p-12 md:shadow-[0px_24px_48px_0px_rgba(4,27,60,0.06)]">
          {children}
        </div>
      </section>
    </main>
  );
}
