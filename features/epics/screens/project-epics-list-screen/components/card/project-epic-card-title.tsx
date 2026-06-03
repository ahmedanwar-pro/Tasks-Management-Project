import type { ReactElement } from 'react';
import type { ProjectEpicListItem } from '../../utils';

type ProjectEpicCardTitleProps = {
  epic: ProjectEpicListItem;
};

export function ProjectEpicCardTitle({
  epic,
}: ProjectEpicCardTitleProps): ReactElement {
  return (
    <h2
      className="text-text-primary text-[18px] leading-[22.5px] font-semibold tracking-normal xl:text-[20px] xl:leading-[28px]"
      id={`${epic.id}-title`}
    >
      {epic.title}
    </h2>
  );
}
