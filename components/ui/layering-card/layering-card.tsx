import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { joinClasses } from '../utils';

type LayeringCardProps = {
  title?: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  visualLabel?: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className' | 'title'>;

export function LayeringCard({
  title = 'The "Layering" Principle',
  description = 'Soft edges defined by tonal shifts.',
  badge = 'Active Task',
  visualLabel = 'Visual representation of nested surfaces',
  className,
  ...props
}: LayeringCardProps): ReactElement {
  return (
    <article
      {...props}
      className={joinClasses(
        'bg-surface-low text-text-primary rounded-md p-1 font-sans tracking-normal',
        className,
      )}
    >
      <div className="bg-surface flex flex-col gap-6 rounded-sm p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col">
            <h3 className="text-title-lg leading-title text-text-primary font-bold tracking-tight">
              {title}
            </h3>
            <p className="text-body-sm leading-base text-text-secondary">
              {description}
            </p>
          </div>
          {badge ? (
            <span className="bg-success text-label-sm leading-compact text-success-text inline-flex min-h-4.75 shrink-0 items-center rounded-xs px-2 py-0.5 font-bold uppercase">
              {badge}
            </span>
          ) : null}
        </div>
        <div className="bg-surface-high text-label-md text-text-muted flex h-32 items-center justify-center rounded-xs px-4 text-center leading-tight">
          {visualLabel}
        </div>
      </div>
    </article>
  );
}

export type { LayeringCardProps };
