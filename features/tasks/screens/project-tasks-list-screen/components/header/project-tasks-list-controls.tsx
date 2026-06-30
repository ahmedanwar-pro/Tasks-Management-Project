import type { ReactElement } from 'react';
import {
  FilterButton,
  ViewSwitcher,
} from '../../../project-tasks-board-screen/components/controls';
import { ProjectTasksListAddTaskButton } from './project-tasks-list-add-task-button';
import { ProjectTasksListSearchInput } from './project-tasks-list-search-input';

type ProjectTasksListControlsProps = {
  isAddTaskVisible: boolean;
  onSearchTermChange: (value: string) => void;
  projectId: string;
  searchTerm: string;
};

export function ProjectTasksListControls({
  isAddTaskVisible,
  onSearchTermChange,
  projectId,
  searchTerm,
}: ProjectTasksListControlsProps): ReactElement {
  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-3 xl:w-auto xl:flex-nowrap xl:items-center">
      <ProjectTasksListSearchInput
        onSearchTermChange={onSearchTermChange}
        searchTerm={searchTerm}
      />
      <ViewSwitcher
        className="hidden h-[38px] min-w-[157px] sm:flex"
        currentView="list"
        projectId={projectId}
      />
      {isAddTaskVisible ? (
        <div className="flex w-full gap-3 sm:hidden">
          <ProjectTasksListAddTaskButton projectId={projectId} />
        </div>
      ) : null}
      <div className="hidden gap-3 sm:flex sm:items-center">
        <FilterButton className="h-7 w-[34px]" />
        {isAddTaskVisible ? (
          <ProjectTasksListAddTaskButton projectId={projectId} />
        ) : null}
      </div>
    </div>
  );
}
