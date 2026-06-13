import type { ReactElement, ReactNode } from 'react';
import { joinClasses } from '@/components/ui/utils';

type EpicDetailsFieldLabelProps = {
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function EpicDetailsFieldLabel({
  action,
  children,
  className,
}: EpicDetailsFieldLabelProps): ReactElement {
  return (
    <h3
      className={joinClasses(
        'text-text-tertiary md:text-label-sm md:leading-compact md:text-text-primary/40 flex h-5 min-w-0 items-center gap-2 text-[11px] leading-[16.5px] font-bold tracking-[0.55px] uppercase md:tracking-normal',
        className,
      )}
    >
      <span className="min-w-0">{children}</span>
      {action}
    </h3>
  );
}
