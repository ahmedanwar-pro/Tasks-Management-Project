import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui';

export function EditProjectLoadingState(): ReactElement {
  return (
    <section
      aria-busy="true"
      aria-label="Loading project"
      aria-live="polite"
      className="relative mx-auto w-full max-w-7xl px-6 pt-8 pb-12 lg:px-8"
      role="status"
    >
      <header className="hidden items-end justify-between pb-10 lg:flex lg:pb-[4.5rem] xl:pb-10">
        <div className="flex min-w-0 flex-col gap-3.5">
          <div className="flex items-center gap-2 pt-0.5">
            <Skeleton className="h-3 w-40 opacity-65" radius="xs" variant="line" />
          </div>
          <Skeleton
            className="h-11 w-[13.5rem] max-w-full opacity-72"
            radius="xs"
            variant="line"
          />
        </div>
        <div
          aria-label="Loading header actions"
          className="flex h-10 w-[13.75rem] shrink-0 items-center justify-center gap-2 rounded-sm bg-surface-low px-5 opacity-75"
          role="status"
        >
          <Skeleton
            className="size-4 opacity-60"
            radius="full"
            variant="avatar"
          />
          <Skeleton className="h-4 w-28 opacity-65" radius="xs" variant="line" />
        </div>
      </header>

      <article className="mx-auto w-full max-w-2xl lg:overflow-hidden lg:rounded-md lg:bg-surface lg:shadow-sm">
        <div className="lg:border-surface-low lg:border-b lg:px-8 lg:pt-8 lg:pb-10.25">
          <div className="flex items-center gap-4">
            <Skeleton
              className="hidden h-11 w-11.5 rounded-sm opacity-70 lg:block"
              radius="sm"
              variant="block"
            />
            <div className="flex flex-col gap-2 lg:gap-3">
              <Skeleton className="h-8 w-44 opacity-75 lg:hidden" radius="xs" variant="line" />
              <Skeleton className="hidden h-10 w-40 opacity-75 lg:block" radius="xs" variant="line" />
              <Skeleton className="h-4 w-72 max-w-[75vw] opacity-65 lg:w-80" radius="xs" variant="line" />
            </div>
          </div>
        </div>

        <div className="pt-8 lg:px-8 lg:pt-8 lg:pb-12">
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-3 w-28 opacity-70" radius="xs" variant="line" />
              <Skeleton
                className="h-(--control-height-2xl) w-full rounded-md opacity-70 lg:h-(--control-height-xl)"
                radius="md"
                variant="block"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-3 w-24 opacity-70" radius="xs" variant="line" />
                <Skeleton className="h-4 w-14 opacity-60" radius="xs" variant="line" />
              </div>
              <Skeleton
                className="min-h-38 w-full rounded-md opacity-70 lg:min-h-30"
                radius="md"
                variant="block"
              />
              <Skeleton className="ml-auto h-4 w-20 opacity-60" radius="xs" variant="line" />
            </div>

            <div className="flex flex-col gap-4 pt-4 lg:flex-row-reverse lg:items-center lg:justify-between">
              <Skeleton
                className="h-12 w-40 self-center rounded-md opacity-70 lg:h-14"
                radius="md"
                variant="block"
              />
              <Skeleton
                className="h-6 w-16 self-center opacity-65 lg:self-auto"
                radius="xs"
                variant="line"
              />
            </div>
          </div>
        </div>

        <aside className="mt-12 rounded-md bg-surface-low p-6 lg:mt-0 lg:flex lg:items-start lg:gap-3 lg:rounded-none">
          <Skeleton
            className="hidden size-4 shrink-0 opacity-60 lg:mt-0.5 lg:block"
            radius="full"
            variant="avatar"
          />
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-4 w-16 opacity-65 lg:hidden" radius="xs" variant="line" />
            <Skeleton className="h-4 w-full max-w-[31rem] opacity-60" radius="xs" variant="line" />
          </div>
        </aside>
      </article>
    </section>
  );
}
