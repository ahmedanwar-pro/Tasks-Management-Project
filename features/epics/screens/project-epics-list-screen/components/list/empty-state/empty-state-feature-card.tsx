import type { ReactElement, ReactNode } from 'react';

type EmptyStateFeatureCardProps = {
  description: string;
  icon: ReactNode;
  title: string;
};

export function EmptyStateFeatureCard({
  description,
  icon,
  title,
}: EmptyStateFeatureCardProps): ReactElement {
  return (
    <article className="bg-surface-low flex min-h-39 flex-col items-start rounded-md px-5 py-5 md:h-[180.5px]">
      <div className="bg-surface text-primary flex size-10 items-center justify-center rounded-sm">
        {icon}
      </div>
      <h2 className="text-text-primary mt-6 text-[16px] leading-6 font-semibold">
        {title}
      </h2>
      <p className="text-text-secondary mt-1 text-[12px] leading-[19.5px]">
        {description}
      </p>
    </article>
  );
}
