import type { ReactElement } from 'react';
import { Skeleton } from '@/components/ui';
import { ProjectMembersFloatingInviteButton } from './project-members-floating-invite-button';

const loadingRows = [
  { nameWidth: 'w-[104px]', emailWidth: 'w-[208px]' },
  { nameWidth: 'w-24', emailWidth: 'w-[152px]' },
  { nameWidth: 'w-[68px]', emailWidth: 'w-[132px]' },
  { nameWidth: 'w-20', emailWidth: 'w-[148px]' },
] as const;

const mobileLoadingRows = [
  { nameWidth: 'w-24', emailWidth: 'w-32' },
  { nameWidth: 'w-28', emailWidth: 'w-36' },
  { nameWidth: 'w-20', emailWidth: 'w-[120px]' },
  { nameWidth: 'w-24', emailWidth: 'w-[136px]' },
] as const;

export function ProjectMembersLoadingState(): ReactElement {
  return (
    <section
      aria-busy="true"
      aria-label="Loading project members"
      aria-live="polite"
      className="mx-auto flex w-full max-w-7xl flex-col px-4 py-8 md:px-8 lg:pt-8"
      role="status"
    >
      <header className="flex flex-col items-center gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 flex-col items-center gap-3 lg:items-start">
          <div className="hidden items-center gap-2 lg:flex">
            <Skeleton animated={false} className="h-3 w-16" radius="xs" />
            <span className="text-border-muted text-[12px] leading-4">/</span>
            <Skeleton animated={false} className="h-3 w-24" radius="xs" />
          </div>
          <Skeleton animated={false} className="h-10 w-64" radius="sm" />
          <Skeleton
            animated={false}
            className="hidden h-4 w-96 max-w-full lg:block"
            radius="xs"
          />
        </div>
        <Skeleton
          animated={false}
          className="hidden h-12 w-40 md:block"
          radius="sm"
          variant="block"
        />
      </header>

      <ul
        aria-hidden="true"
        className="mt-5 flex w-full flex-col gap-3 lg:hidden"
      >
        {mobileLoadingRows.map((row, index) => (
          <li
            className="bg-surface flex min-h-19.25 items-center justify-between gap-3 rounded-md p-4"
            key={index}
          >
            <div className="flex min-w-0 items-center gap-4">
              <Skeleton
                animated={false}
                className="size-12"
                radius="lg"
                variant="avatar"
              />
              <div className="min-w-0">
                <Skeleton
                  animated={false}
                  className={`h-5 max-w-full ${row.nameWidth}`}
                  radius="xs"
                />
                <Skeleton
                  animated={false}
                  className={`mt-0.5 h-[16.5px] max-w-full ${row.emailWidth}`}
                  radius="xs"
                />
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <Skeleton animated={false} className="h-4.75 w-14" radius="xs" />
              <Skeleton animated={false} className="size-5" radius="xs" />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 lg:mt-16.75 lg:flex lg:justify-center">
        <div className="border-surface-muted bg-surface-low hidden rounded-md border p-1 lg:block">
          <div className="bg-surface w-196.25 overflow-hidden rounded-md shadow-sm">
            <table className="w-full border-collapse">
              <caption className="sr-only">Loading project members</caption>
              <thead className="bg-surface-high/30">
                <tr>
                  <th className="px-8 py-5 text-left" scope="col">
                    <Skeleton
                      animated={false}
                      className="h-[14px] w-14"
                      radius="xs"
                    />
                  </th>
                  <th className="w-46.75 px-8 py-5 text-left" scope="col">
                    <Skeleton
                      animated={false}
                      className="h-[14px] w-8"
                      radius="xs"
                    />
                  </th>
                  <th className="w-42.5 px-8 py-5 text-right" scope="col">
                    <Skeleton
                      animated={false}
                      className="ml-auto h-[14px] w-14"
                      radius="xs"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {loadingRows.map((row, index) => (
                  <tr
                    className="border-surface-muted border-t first:border-t-0"
                    key={index}
                  >
                    <th className="px-8 py-4 text-left" scope="row">
                      <div className="flex items-center gap-4">
                        <Skeleton
                          animated={false}
                          className="size-12"
                          radius="lg"
                          variant="avatar"
                        />
                        <div className="min-w-0">
                          <Skeleton
                            animated={false}
                            className={`h-5 max-w-full ${row.nameWidth}`}
                            radius="xs"
                          />
                          <Skeleton
                            animated={false}
                            className={`mt-0.5 h-4 max-w-full ${row.emailWidth}`}
                            radius="xs"
                          />
                        </div>
                      </div>
                    </th>
                    <td className="w-46.75 px-8 py-8.5 align-middle">
                      <Skeleton
                        animated={false}
                        className="h-5 w-16"
                        radius="lg"
                      />
                    </td>
                    <td className="w-42.5 px-8 py-8 text-right align-middle">
                      <Skeleton
                        animated={false}
                        className="ml-auto size-6"
                        radius="xs"
                        variant="block"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ProjectMembersFloatingInviteButton />
    </section>
  );
}
