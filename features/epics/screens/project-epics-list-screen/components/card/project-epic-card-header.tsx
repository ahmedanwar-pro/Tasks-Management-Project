import type { ReactElement } from 'react';
import { Badge } from '@/components/ui';
import type { ProjectEpicListItem } from '../../utils';
import {
  MoreActionsHorizontalIcon,
  MoreActionsIcon,
} from '../icons/project-epics-icons';

type ProjectEpicCardHeaderProps = {
  epic: ProjectEpicListItem;
};

export function ProjectEpicCardHeader({
  epic,
}: ProjectEpicCardHeaderProps): ReactElement {
  return (
    <div className="flex items-start justify-between">
      <Badge
        className="text-primary xl:bg-success xl:leading-compact h-6.25 w-18 bg-[#dae2ff] px-2 py-1 text-[11px] leading-[16.5px] tracking-[0.55px] uppercase xl:h-[23px] xl:w-auto xl:px-2.5 xl:py-1 xl:text-[10px] xl:tracking-[0.5px] xl:text-[#005235]"
        size="sm"
        variant="success"
      >
        {epic.epic_id}
      </Badge>
      <button
        aria-label={`Open actions for ${epic.title}`}
        className="text-border-muted hover:text-text-muted focus-visible:outline-primary flex h-4 w-4 items-center justify-center rounded-xs p-0 focus-visible:outline-2 focus-visible:outline-offset-2 xl:w-1"
        type="button"
      >
        <MoreActionsHorizontalIcon className="xl:hidden" />
        <MoreActionsIcon className="hidden h-4 w-1 xl:block" />
      </button>
    </div>
  );
}
