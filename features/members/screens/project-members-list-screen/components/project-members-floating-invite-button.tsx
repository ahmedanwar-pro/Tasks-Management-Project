import type { ReactElement } from 'react';
import { InviteMemberIcon } from './project-members-icons';

export function ProjectMembersFloatingInviteButton(): ReactElement {
  return (
    <button
      aria-label="Invite member"
      className="focus-visible:outline-primary fixed right-4 bottom-20 flex size-10 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-container))] text-text-inverse shadow-[0px_10px_15px_-3px_rgba(0,61,155,0.2),0px_4px_6px_-4px_rgba(0,61,155,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
      type="button"
    >
      <InviteMemberIcon className="h-[13.333px] w-[18.333px]" />
    </button>
  );
}
