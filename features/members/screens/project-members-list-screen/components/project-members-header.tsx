import type { ReactElement } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { InviteMemberIcon } from './project-members-icons';

type ProjectMembersHeaderProps = {
  projectName?: string | null;
};

export function ProjectMembersHeader({
  projectName,
}: ProjectMembersHeaderProps): ReactElement {
  const breadcrumbProjectName = projectName?.trim() || 'Project';

  return (
    <header className="flex flex-col items-center gap-3 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col items-center gap-4 lg:items-start">
        <nav
          aria-label="Breadcrumb"
          className="hidden items-center gap-2 text-[12px] leading-4 font-bold tracking-[1.2px] uppercase lg:flex"
        >
          <Link
            className="text-text-secondary/60 hover:text-text-secondary"
            href="/projects"
          >
            Projects
          </Link>
          <span aria-hidden="true" className="text-text-secondary/60">
            &gt;
          </span>
          <span className="text-text-secondary/60">{breadcrumbProjectName}</span>
          <span aria-hidden="true" className="text-text-secondary/60">
            &gt;
          </span>
          <span aria-current="page" className="text-primary">
            Members
          </span>
        </nav>
        <h1
          className="text-text-primary text-center text-[32px] leading-10 font-semibold tracking-[-0.9px] lg:text-left lg:text-[36px]"
          id="project-members-title"
        >
          Project Members
        </h1>
      </div>

      <div className="hidden md:block">
        <Button
          aria-label="Invite member"
          className="h-12 rounded-xs px-6 shadow-[0px_10px_15px_-3px_rgba(0,61,155,0.2),0px_4px_6px_-4px_rgba(0,61,155,0.2)]"
          iconLeft={
            <InviteMemberIcon className="h-[13.333px] w-[18.333px]" />
          }
          type="button"
        >
          Invite Member
        </Button>
      </div>
    </header>
  );
}
