import type { ReactElement, ReactNode } from 'react';

type TaskDetailsChipVariant = 'mobile' | 'tablet';

type TaskDetailsChipProps = {
  icon: ReactNode;
  label: string;
  variant: TaskDetailsChipVariant;
  tone?: 'success' | 'epic';
};

const chipVariantClassNames: Record<TaskDetailsChipVariant, string> = {
  mobile:
    'flex h-[25px] max-w-full min-w-0 items-center gap-1.5 rounded-lg px-3 py-1 text-[11px] leading-[16.5px] font-bold',
  tablet:
    'text-label-md flex h-[var(--control-height-xs)] max-w-full items-center gap-2 rounded-lg px-3 leading-tight font-bold',
};

const chipToneClassNames: Record<
  TaskDetailsChipVariant,
  Record<NonNullable<TaskDetailsChipProps['tone']>, string>
> = {
  mobile: {
    success: 'bg-success text-success-text',
    epic: 'bg-primary-container-muted text-text-secondary',
  },
  tablet: {
    success: 'bg-success text-success-text',
    epic: 'bg-primary-container-muted text-text-tertiary',
  },
};

export function TaskDetailsChip({
  icon,
  label,
  variant,
  tone = 'success',
}: TaskDetailsChipProps): ReactElement {
  return (
    <span
      className={`${chipToneClassNames[variant][tone]} ${chipVariantClassNames[variant]}`}
    >
      {icon}
      <span className="truncate">{label}</span>
    </span>
  );
}
