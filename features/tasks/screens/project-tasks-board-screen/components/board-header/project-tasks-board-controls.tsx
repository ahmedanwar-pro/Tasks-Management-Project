import type { ReactElement } from 'react';
import { BoardSearchInput, FilterButton, ViewSwitcher } from '../controls';

type ProjectTasksBoardControlsProps = {
  onSearchTermChange: (value: string) => void;
  projectId: string;
  searchTerm: string;
};

export function ProjectTasksBoardControls({
  onSearchTermChange,
  projectId,
  searchTerm,
}: ProjectTasksBoardControlsProps): ReactElement {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap xl:w-auto xl:flex-nowrap xl:items-center">
      <BoardSearchInput
        onValueChange={onSearchTermChange}
        value={searchTerm}
      />
      <ViewSwitcher projectId={projectId} />
      <FilterButton />
    </div>
  );
}
