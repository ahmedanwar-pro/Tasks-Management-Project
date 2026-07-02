import type { ReactElement } from 'react';
import Link from 'next/link';
import { InviteMemberIcon } from './project-members-icons';

type ProjectMembersFloatingInviteButtonProps = {
  projectId: string;
};

export function ProjectMembersFloatingInviteButton({
  projectId,
}: ProjectMembersFloatingInviteButtonProps): ReactElement {
  return (
    <Link
      aria-label="Invite member"
      className="focus-visible:outline-primary text-text-inverse fixed right-4 bottom-20 flex size-10 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-container))] shadow-[0px_10px_15px_-3px_rgba(0,61,155,0.2),0px_4px_6px_-4px_rgba(0,61,155,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
      href={`/projects/${projectId}/members/invite`}
    >
      <InviteMemberIcon className="h-[13.333px] w-[18.333px]" />
    </Link>
  );
}
