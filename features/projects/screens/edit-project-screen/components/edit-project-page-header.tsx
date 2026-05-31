import Link from 'next/link';
import type { ReactElement } from 'react';
import { Button } from '@/components/ui';

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

export function EditProjectPageHeader(): ReactElement {
  return (
    <header className="hidden items-end justify-between pb-10 lg:flex">
      <div className="flex flex-col gap-4">
        <nav
          aria-label="Breadcrumb"
          className="text-text-muted text-label-md tracking-label flex items-center gap-2 font-bold uppercase"
        >
          <Link
            className="hover:text-primary transition-colors"
            href="/projects"
          >
            Projects
          </Link>
          <BreadcrumbDivider />
          <span>Project Title</span>
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
