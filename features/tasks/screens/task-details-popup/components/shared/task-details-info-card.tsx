import type { ReactElement, ReactNode } from 'react';
import { joinClasses } from '@/components/ui/utils';

type TaskDetailsInfoCardVariant = 'mobile' | 'tablet';

type TaskDetailsInfoCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  variant: TaskDetailsInfoCardVariant;
  visuallyHideLabel?: boolean;
};

const infoCardClassNames: Record<TaskDetailsInfoCardVariant, string> = {
  mobile: 'bg-surface-low flex h-20 flex-col gap-1 rounded-md px-4 pt-4 pb-5',
  tablet: 'bg-surface-low flex min-h-[92px] flex-col gap-3 rounded-md p-4',
};

const infoCardLabelClassNames: Record<TaskDetailsInfoCardVariant, string> = {
  mobile: 'text-text-muted text-[11px] leading-[16.5px] font-bold uppercase',
  tablet:
    'text-label-sm leading-compact text-text-muted font-bold tracking-normal uppercase',
};

const infoCardValueClassNames: Record<TaskDetailsInfoCardVariant, string> = {
  mobile: 'text-body-sm text-text-primary leading-base font-medium',
  tablet: 'text-body-sm leading-base text-text-primary font-medium',
};

export function TaskDetailsInfoCard({
  icon,
  label,
  value,
  variant,
  visuallyHideLabel = false,
}: TaskDetailsInfoCardProps): ReactElement {
  const contentOffsetClassName =
    variant === 'mobile' ? (visuallyHideLabel ? 'pt-2.5' : 'pt-1.5') : '';

  return (
    <article className={infoCardClassNames[variant]}>
      <p className={infoCardLabelClassNames[variant]}>
        {visuallyHideLabel ? (
          <>
            <span className="sr-only">{label}</span>
            <span aria-hidden="true"> </span>
          </>
        ) : (
          label
        )}
      </p>
      <div
        className={joinClasses(
          'flex items-center gap-2',
          contentOffsetClassName,
        )}
      >
        {icon}
        <p className={infoCardValueClassNames[variant]}>{value}</p>
      </div>
    </article>
  );
}
