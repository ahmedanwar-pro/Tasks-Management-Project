import type { ReactElement } from 'react';
import { Card, Skeleton } from '@/components/ui';

export function ProjectsLoadingCard(): ReactElement {
  return (
    <Card
      className="flex h-52.75 flex-col border-[#ccd6e4] bg-surface px-5 pt-5 pb-5 shadow-[0px_1px_2px_rgba(15,23,42,0.05),0px_6px_18px_rgba(15,23,42,0.04)] md:h-55 md:px-7 md:pt-7 md:pb-6"
      padding="none"
    >
      <div className="flex flex-1 flex-col md:min-h-0 md:pb-2">
        <div className="flex items-start justify-between gap-4">
          <Skeleton
            className="h-6 w-[42%] max-w-[9rem] opacity-70"
            radius="xs"
            variant="line"
          />
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[2px]">
            <Skeleton
              className="h-4! w-4! rounded-[2px] opacity-60"
              radius="xs"
              variant="block"
            />
          </span>
        </div>
        <div className="mt-5 flex gap-2 md:hidden">
          <Skeleton
            className="h-4 w-[58%] max-w-[10rem] opacity-60"
            radius="xs"
            variant="line"
          />
          <Skeleton
            className="h-4 w-[24%] max-w-[4rem] opacity-55"
            radius="xs"
            variant="line"
          />
        </div>
        <div className="mt-4 hidden flex-col gap-2 md:flex">
          <Skeleton
            className="h-4 w-[74%] max-w-[12rem] opacity-60"
            radius="xs"
            variant="line"
          />
          <Skeleton
            className="h-4 w-[62%] max-w-[10rem] opacity-55"
            radius="xs"
            variant="line"
          />
        </div>
        <div className="mt-4 hidden flex-1 md:block" />
      </div>

      <div className="mt-auto">
        <Skeleton
          className="block h-px w-full opacity-60"
          radius="full"
          variant="block"
        />
        <div className="mt-4 flex items-center justify-between">
          <Skeleton
            className="h-3.5 w-[28%] max-w-[5.75rem] opacity-70"
            radius="xs"
            variant="line"
          />
          <Skeleton
            className="h-5 w-[26%] max-w-[5.25rem] opacity-70"
            radius="xs"
            variant="line"
          />
        </div>
      </div>
    </Card>
  );
}
