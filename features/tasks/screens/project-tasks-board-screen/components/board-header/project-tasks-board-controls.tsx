import type { ReactElement } from 'react';
import { BoardSearchInput, FilterButton, ViewSwitcher } from '../controls';

type ProjectTasksBoardControlsProps = {
  projectId: string;
};

export function ProjectTasksBoardControls({
  projectId,
}: ProjectTasksBoardControlsProps): ReactElement {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap xl:w-auto xl:flex-nowrap xl:items-center">
      <BoardSearchInput />
      <ViewSwitcher projectId={projectId} />
      <FilterButton />
    </div>
  );
}
