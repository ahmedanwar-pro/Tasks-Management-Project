import { getUserInitials } from '@/components/layout/utils/get-user-initials';
import type { ProjectMemberResponse } from '@/features/members/screens/project-members-list-screen/api';
import type { EpicDetailsTaskAssignee } from '../../types';
import { getText } from './text';

function getMemberName(member: ProjectMemberResponse): string {
  return (
    getText(member.name) ||
    getText(member.full_name) ||
    getText(member.display_name) ||
    getText(member.member_name) ||
    getText(member.member_full_name) ||
    getText(member.profile_name) ||
    getText(member.user_name) ||
    getText(member.metadata?.name) ||
    getText(member.email) ||
    getText(member.user_email) ||
    getText(member.metadata?.email)
  );
}

function getMemberAvatarUrl(member: ProjectMemberResponse): string {
  return getText(member.avatar_url);
}

export function getMemberAssignee(
  assigneeId: string,
  members: ProjectMemberResponse[],
): EpicDetailsTaskAssignee | null {
  const member = members.find((projectMember) => {
    const memberIds = [
      projectMember.user_id,
      projectMember.id,
      projectMember.member_id,
      projectMember.profile_id,
      projectMember.metadata?.id,
    ].map(getText);

    return memberIds.includes(assigneeId);
  });

  if (!member) {
    return null;
  }

  const memberName = getMemberName(member);

  if (!memberName) {
    return null;
  }

  return {
    avatarUrl: getMemberAvatarUrl(member) || undefined,
    initials: getUserInitials(memberName),
    name: memberName,
  };
}
