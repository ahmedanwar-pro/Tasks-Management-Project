import type { ReactElement } from 'react';
import { ProjectMemberAvatar } from './project-member-avatar';
import { ProjectMemberRoleBadge } from './project-member-role-badge';
import { MoreActionsIcon } from './project-members-icons';
import type { ProjectMember } from './project-members-types';

type ProjectMembersTableProps = {
  members: ProjectMember[];
};

export function ProjectMembersTable({
  members,
}: ProjectMembersTableProps): ReactElement {
  return (
    <div className="border-surface-muted bg-surface-low hidden rounded-md border p-1 lg:block">
      <div className="bg-surface w-196.25 overflow-hidden rounded-md shadow-sm">
        <table className="w-full border-collapse">
          <caption className="sr-only">Project members and their roles</caption>
          <thead className="bg-surface-high/30">
            <tr>
              <th
                className="text-text-secondary px-8 py-5 text-left text-[11px] leading-[14px] font-bold tracking-[1.1px] uppercase"
                scope="col"
              >
                Member
              </th>
              <th
                className="text-text-secondary w-46.75 px-8 py-5 text-left text-[11px] leading-[14px] font-bold tracking-[1.1px] uppercase"
                scope="col"
              >
                Role
              </th>
              <th
                className="text-text-secondary w-42.5 px-8 py-5 text-right text-[11px] leading-[14px] font-bold tracking-[1.1px] uppercase"
                scope="col"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                className="border-surface-muted border-t first:border-t-0"
                key={member.id}
              >
                <th className="px-8 py-4 text-left" scope="row">
                  <div className="flex items-center gap-4">
                    <ProjectMemberAvatar member={member} />
                    <div className="min-w-0">
                      <p className="text-text-primary text-body-sm leading-base truncate font-semibold">
                        {member.name}
                      </p>
                      <p className="text-text-secondary truncate text-[12px] leading-4 font-normal">
                        {member.email}
                      </p>
                    </div>
                  </div>
                </th>
                <td className="w-46.75 px-8 py-8.5 align-middle">
                  <ProjectMemberRoleBadge role={member.role} />
                </td>
                <td className="w-42.5 px-8 py-8 text-right align-middle">
                  <button
                    aria-label={`Open actions for ${member.name}`}
                    className="focus-visible:outline-primary text-text-secondary inline-flex size-6 items-center justify-center rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2"
                    type="button"
                  >
                    <MoreActionsIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
