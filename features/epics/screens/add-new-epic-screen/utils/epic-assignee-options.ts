import type { ProjectMemberResponse } from '@/features/members/screens/project-members-list-screen/api';

export type AssigneeOption = {
  id: string;
  label: string;
};

function getMemberName(member: ProjectMemberResponse): string {
  return (
    member.metadata?.name ??
    member.name ??
    member.full_name ??
    member.display_name ??
    member.member_name ??
    member.member_full_name ??
    member.profile_name ??
    member.user_name ??
    ''
  ).trim();
}

function getMemberId(member: ProjectMemberResponse, index: number): string {
  const name = getMemberName(member);
  const email = member.email ?? member.user_email ?? '';

  return (
    member.user_id ??
    member.metadata?.id ??
    member.id ??
    member.member_id ??
    member.profile_id ??
    `${email || name || 'member'}-${index}`
  );
}

export function mapAssigneeOption(
  member: ProjectMemberResponse,
  index: number,
): AssigneeOption {
  const name = getMemberName(member);

  return {
    id: getMemberId(member, index),
    label: name || 'Project Member',
  };
}
