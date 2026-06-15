import type { ReactElement, ReactNode } from 'react';

type AddNewTaskCardProps = {
  children: ReactNode;
};

export function AddNewTaskCard({
  children,
}: AddNewTaskCardProps): ReactElement {
  return (
    <article className="lg:border-border-subtle lg:bg-surface w-full lg:mt-8 lg:overflow-hidden lg:rounded-md lg:border lg:p-6 lg:shadow-[0px_24px_48px_-12px_rgba(4,27,60,0.06)]">
      {children}
    </article>
  );
}
