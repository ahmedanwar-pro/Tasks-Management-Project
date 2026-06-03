import type { ReactElement } from 'react';
import type { ProjectEpicListItem } from '../../utils';
import { CalendarIcon, CreatedByIcon } from '../icons/project-epics-icons';

type ProjectEpicDesktopMetadataProps = {
  epic: ProjectEpicListItem;
};

export function ProjectEpicDesktopMetadata({
  epic,
}: ProjectEpicDesktopMetadataProps): ReactElement {
  return (
    <div className="border-surface-low hidden border-t pt-[17px] lg:flex lg:items-center lg:justify-between">
      <p className="text-text-secondary/80 flex min-w-0 items-center gap-2 text-[11px] leading-[16.5px]">
        <CreatedByIcon className="h-[9.917px] w-[11.083px]" />
        <span className="truncate">
          Created by:{' '}
          <strong className="text-text-primary font-semibold">
            {epic.createdBy.name}
          </strong>
        </span>
      </p>
      <p className="text-text-secondary/80 flex shrink-0 items-center gap-2 text-[11px] leading-[16.5px] whitespace-nowrap">
        <CalendarIcon className="h-[11.667px] w-[10.5px]" />
        <time dateTime={epic.createdDateTime}>{epic.createdDate}</time>
      </p>
    </div>
  );
}
