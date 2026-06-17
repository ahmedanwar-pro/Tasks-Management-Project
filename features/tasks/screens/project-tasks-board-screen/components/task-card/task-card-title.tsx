import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';

type TaskCardTitleProps = {
  isDone: boolean;
  title: string;
};

export function TaskCardTitle({
  isDone,
  title,
}: TaskCardTitleProps): ReactElement {
  return (
    <h3
      className={joinClasses(
        'line-clamp-2 min-h-[38.5px] text-[14px] leading-[19.25px] font-medium tracking-normal text-[#041b3c]',
        isDone && 'line-through',
      )}
    >
      {title}
    </h3>
  );
}
