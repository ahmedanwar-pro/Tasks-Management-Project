import type { ReactElement, ReactNode } from 'react';

type AddNewEpicCardProps = {
  children: ReactNode;
};

export function AddNewEpicCard({
  children,
}: AddNewEpicCardProps): ReactElement {
  return (
    <article className="lg:border-border-subtle lg:bg-surface w-full lg:mt-8 lg:overflow-hidden lg:rounded-md lg:border lg:px-8 lg:pt-8 lg:pb-17 lg:shadow-[0px_24px_48px_-12px_rgba(4,27,60,0.06)]">
      {children}
    </article>
  );
}
