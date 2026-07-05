import { getUserInitials } from '@/components/layout/utils/get-user-initials';
import type { ProjectMember } from '../components';
import type { ProjectMemberResponse } from '../api';

function normalizeRole(role?: string | null): ProjectMember['role'] {
  const normalizedRole = role?.trim().toLowerCase();

  if (normalizedRole === 'owner') {
    return 'Owner';
  }

  if (normalizedRole === 'admin') {
    return 'Admin';
  }

  if (normalizedRole === 'viewer') {
    return 'Viewer';
  }

  return 'Member';
}

function getAvatarTone(role: ProjectMember['role']): ProjectMember['avatarTone'] {
  if (role === 'Owner') {
    return 'primary';
  }

  if (role === 'Viewer') {
    return 'soft';
  }

  return 'success';
}

function getMemberFullName(member: ProjectMemberResponse): string {
  return (
    member.name ??
    member.full_name ??
    member.display_name ??
    member.member_name ??
    member.member_full_name ??
    member.profile_name ??
    member.user_name ??
    member.metadata?.name ??
    ''
  ).trim();
}

export function mapProjectMember(
  member: ProjectMemberResponse,
  index: number,
): ProjectMember {
  const email =
    member.email ?? member.user_email ?? member.metadata?.email ?? '';
  const role = normalizeRole(member.role);
  const fullName = getMemberFullName(member);
  const name = fullName || 'Project Member';

  return {
    avatarTone: getAvatarTone(role),
    avatarUrl: member.avatar_url ?? undefined,
    email,
    id:
      member.id ??
      member.member_id ??
      member.user_id ??
      member.profile_id ??
      `${email || name}-${index}`,
    initials: getUserInitials(fullName),
    name,
    role,
  };
}
