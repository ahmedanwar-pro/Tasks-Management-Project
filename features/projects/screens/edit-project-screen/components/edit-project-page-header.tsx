import Link from 'next/link';
import type { ReactElement } from 'react';
import { Button } from '@/components/ui';
import { getProjectsPageHref } from '../../projects-list-screen/utils/projects-list-navigation';

function AddMemberIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-icon-sm"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.5 16a5.5 5.5 0 0 1 11 0M16 7v6M13 10h6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function BreadcrumbDivider(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="h-2 w-1"
      fill="none"
      viewBox="0 0 4 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m1 1 3 3-3 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type EditProjectPageHeaderProps = {
  currentPage: number;
  initialSource: 'list' | 'sidebar';
  projectId: string;
  projectName?: string | null;
};

export function EditProjectPageHeader({
  currentPage,
  initialSource,
  projectId,
  projectName,
}: EditProjectPageHeaderProps): ReactElement {
  const breadcrumbProjectName = projectName?.trim() || 'Project';
  const projectsHref =
    initialSource === 'sidebar'
      ? `/projects/${projectId}/epics`
      : getProjectsPageHref(currentPage);

  return (
    <header className="hidden items-end justify-between pb-10 lg:flex lg:pb-[4.5rem] xl:pb-10">
      <div className="flex min-w-0 flex-col gap-4">
        <nav
          aria-label="Breadcrumb"
          className="text-text-muted text-label-md tracking-label flex min-w-0 items-center gap-2 font-bold uppercase"
        >
          <Link
            className="hover:text-primary transition-colors"
            href={projectsHref}
          >
            Projects
          </Link>
          <BreadcrumbDivider />
          <span className="group relative min-w-0">
            <span className="block max-w-52 truncate xl:max-w-80">
              {breadcrumbProjectName}
            </span>
            <span className="pointer-events-none absolute bottom-full left-0 z-20 mb-2 w-max max-w-84 rounded-md bg-text-primary px-3 py-2 text-[13px] leading-5 font-medium tracking-normal text-text-inverse normal-case opacity-0 shadow-sm [overflow-wrap:anywhere] transition-opacity duration-150 delay-0 group-hover:opacity-100 group-hover:delay-300">
              {breadcrumbProjectName}
            </span>
          </span>
          <BreadcrumbDivider />
          <span className="text-primary">Edit</span>
        </nav>
        <h1 className="text-text-primary leading-display text-[36px] font-semibold tracking-[-0.9px]">
          Edit Project
        </h1>
      </div>

      <Button iconLeft={<AddMemberIcon />} size="md" type="button">
        Invite Member
      </Button>
    </header>
  );
}
