import type { ReactElement } from 'react';
import { Avatar } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';
import type { ProjectMember } from './project-members-types';

type ProjectMemberAvatarProps = {
  member: Pick<
    ProjectMember,
    'avatarTone' | 'avatarUrl' | 'initials' | 'name'
  >;
};

const avatarToneClasses: Record<ProjectMember['avatarTone'], string> = {
  primary: 'bg-primary-container-muted text-primary shadow-none',
  success: 'bg-success text-success-text shadow-none',
  soft: 'bg-surface-highest text-text-primary shadow-none',
};

export function ProjectMemberAvatar({
  member,
}: ProjectMemberAvatarProps): ReactElement {
  return (
    <Avatar
      className={joinClasses(
        'rounded-lg text-body-sm font-bold md:size-12',
        avatarToneClasses[member.avatarTone],
      )}
      initials={member.initials}
      name={member.name}
      size="2xl"
      src={member.avatarUrl}
    />
  );
}
