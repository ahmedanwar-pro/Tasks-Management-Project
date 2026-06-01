import type { ReactElement } from 'react';
import { ProjectMemberAvatar } from './project-member-avatar';
import { ProjectMemberRoleBadge } from './project-member-role-badge';
import { MoreActionsIcon } from './project-members-icons';
import type { ProjectMember } from './project-members-types';

type ProjectMembersMobileListProps = {
  members: ProjectMember[];
};

export function ProjectMembersMobileList({
  members,
}: ProjectMembersMobileListProps): ReactElement {
  return (
    <ul
      aria-label="Project members"
      className="flex w-full flex-col gap-3 lg:hidden"
    >
      {members.map((member) => (
        <li
          className="bg-surface flex min-h-19.25 items-center justify-between gap-3 rounded-md p-4"
          key={member.id}
        >
          <div className="flex min-w-0 items-center gap-4">
            <ProjectMemberAvatar member={member} />
            <div className="min-w-0">
              <p className="text-text-primary text-body-sm leading-base truncate font-semibold">
                {member.name}
              </p>
              <p className="text-text-secondary truncate text-[11px] leading-[16.5px]">
                {member.email}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <ProjectMemberRoleBadge compact role={member.role} />
            <button
              aria-label={`Open actions for ${member.name}`}
              className="focus-visible:outline-primary text-text-secondary flex size-5 items-center justify-center rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2"
              type="button"
            >
              <MoreActionsIcon className="h-3 w-1" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
