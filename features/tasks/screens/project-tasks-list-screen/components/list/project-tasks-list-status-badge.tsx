import type { ReactElement } from 'react';
import { Badge } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';

type ProjectTasksListStatusBadgeProps = {
  allowWrap?: boolean;
  className?: string;
  label: string;
};

const wrappedStatusLabels = new Set(['READY FOR QA', 'READY FOR PROD']);

export function ProjectTasksListStatusBadge({
  allowWrap = true,
  className,
  label,
}: ProjectTasksListStatusBadgeProps): ReactElement {
  const shouldWrap = allowWrap && wrappedStatusLabels.has(label);

  return (
    <Badge
      className={joinClasses(
        'inline-flex min-h-[21px] w-fit min-w-max items-center justify-center px-2 py-0 text-center leading-[13px] whitespace-nowrap uppercase',
        'text-[11px] leading-[16.5px] font-bold tracking-normal',
        shouldWrap &&
          'min-h-[34px] min-w-[64px] px-1.5 py-0.5 leading-[13px] whitespace-normal',
        className,
      )}
      shape="rounded"
      size="sm"
      variant="custom"
    >
      {shouldWrap ? (
        <>
          READY FOR
          <br />
          {label.replace('READY FOR ', '')}
        </>
      ) : (
        label
      )}
    </Badge>
  );
}
