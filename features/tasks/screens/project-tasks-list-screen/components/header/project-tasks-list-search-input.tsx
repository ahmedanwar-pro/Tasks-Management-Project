import type { ReactElement } from 'react';
import { BoardSearchInput } from '../../../project-tasks-board-screen/components/controls';

export function ProjectTasksListSearchInput(): ReactElement {
  return (
    <BoardSearchInput
      className="sm:w-[256px]"
      iconClassName="max-sm:left-3.5 max-sm:[&>svg]:size-[18px]"
      inputClassName="h-9 py-2 pl-10 max-sm:text-[16px] sm:h-9"
    />
  );
}
