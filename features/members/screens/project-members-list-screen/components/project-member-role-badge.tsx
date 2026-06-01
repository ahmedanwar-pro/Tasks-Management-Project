import type { ReactElement } from 'react';
import { Badge } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';
import type { ProjectMemberRole } from './project-members-types';

type ProjectMemberRoleBadgeProps = {
  role: ProjectMemberRole;
  compact?: boolean;
};

const roleClasses: Record<ProjectMemberRole, string> = {
  Owner: 'bg-primary-container text-text-inverse',
  Admin: 'bg-primary-container-muted text-text-tertiary',
  Member: 'bg-primary-container-muted text-text-secondary',
  Viewer: 'bg-surface-muted text-text-secondary',
};

export function ProjectMemberRoleBadge({
  role,
  compact = false,
}: ProjectMemberRoleBadgeProps): ReactElement {
  return (
    <Badge
      className={joinClasses(
        'border-transparent uppercase',
        compact
          ? 'leading-compact min-h-4.75 rounded-xs px-2 py-0 text-[10px] tracking-[-0.25px]'
          : 'min-h-5 rounded-lg px-3 py-1 text-[10px] leading-3 -tracking-tight',
        roleClasses[role],
      )}
      shape={compact ? 'rounded' : 'pill'}
      size="sm"
    >
      {role}
    </Badge>
  );
}
