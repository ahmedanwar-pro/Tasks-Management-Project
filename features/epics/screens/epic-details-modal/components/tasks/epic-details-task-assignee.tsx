import type { ReactElement } from 'react';
import { Avatar } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';
import type { EpicDetailsTaskAssignee } from '../../types';
import { UnassignedIcon } from '../icons/epic-details-modal-icons';

type EpicDetailsTaskAssigneeProps = {
  assignee: EpicDetailsTaskAssignee | null;
  compact?: boolean;
};

export function EpicDetailsTaskAssignee({
  assignee,
  compact = false,
}: EpicDetailsTaskAssigneeProps): ReactElement {
  if (!assignee) {
    return (
      <span className="flex min-w-0 items-center gap-2">
        <span
          aria-hidden="true"
          className={joinClasses(
            'bg-surface-high text-text-tertiary border-border-inverse flex shrink-0 items-center justify-center',
            compact ? 'size-5 rounded-sm' : 'size-6 rounded-[12px] border-2',
          )}
        >
          <UnassignedIcon className={compact ? 'size-2.5' : undefined} />
        </span>
        <span
          className={joinClasses(
            'min-w-0 font-medium break-words whitespace-normal text-[#434654] md:truncate',
            compact
              ? 'text-[11px] leading-[16.5px]'
              : 'text-body-sm leading-base',
          )}
        >
          Unassigned
        </span>
      </span>
    );
  }

  return (
    <span className="flex min-w-0 items-center gap-2">
      <Avatar
        className={joinClasses(
          'rounded-[12px] bg-[#cdddff] text-[#51617e] shadow-none',
          compact
            ? 'size-5 text-[8px] leading-3'
            : 'size-6 text-[10px] leading-[15px]',
        )}
        initials={assignee.initials}
        name={assignee.name}
        size="xs"
        src={assignee.avatarUrl}
      />
      <span
        className={joinClasses(
          'min-w-0 font-medium break-words whitespace-normal text-[#434654] md:truncate',
          compact
            ? 'text-[11px] leading-[16.5px]'
            : 'text-body-sm leading-base',
        )}
      >
        {assignee.name}
      </span>
    </span>
  );
}
