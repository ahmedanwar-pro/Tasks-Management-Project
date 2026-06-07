import type { ReactElement } from 'react';
import { Avatar } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';
import type { EpicDetailsPerson as EpicDetailsPersonType } from '../../types';
import { UnassignedIcon } from '../icons/epic-details-modal-icons';

type EpicDetailsPersonProps = {
  person: EpicDetailsPersonType | null;
  tone?: 'assignee' | 'createdBy';
};

export function EpicDetailsPerson({
  person,
  tone = 'createdBy',
}: EpicDetailsPersonProps): ReactElement {
  if (!person) {
    return (
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-[12px] border-2 border-border-inverse bg-surface-high p-0.5 text-text-tertiary md:size-7">
          <UnassignedIcon />
        </span>
        <span className="min-w-0 truncate text-body-sm font-medium leading-base text-text-tertiary">
          Unassigned
        </span>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 items-center gap-2">
      <Avatar
        className={joinClasses(
          'size-6 rounded-[12px] bg-[#dae2ff] text-[11px] leading-normal text-[#001848] shadow-none md:size-7 md:text-label-sm md:leading-compact',
          tone === 'createdBy' &&
            'md:bg-primary-container md:text-text-inverse',
          tone === 'assignee' && 'md:bg-[#cdddff] md:text-[#51617e]',
        )}
        initials={person.initials}
        name={person.name}
        size="sm"
        src={person.avatarUrl}
      />
      <span className="min-w-0 truncate text-body-sm font-medium leading-base text-text-primary">
        {person.name}
      </span>
    </div>
  );
}
