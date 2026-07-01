import { closestCenter, DndContext } from '@dnd-kit/core';
import type { ComponentProps, ReactElement, RefObject } from 'react';
import type { ProjectTasksBoardColumnData } from '../../types';
import {
  projectTasksBoardAnnouncements,
  projectTasksBoardScreenReaderInstructions,
} from '../../utils';
import { ProjectTasksBoardLoadMore } from '../states';
import {
  ProjectTasksBoardColumnList,
  type ProjectTasksBoardColumnState,
} from './project-tasks-board-column-list';

type ProjectTasksBoardDndProps = Pick<
  ComponentProps<typeof DndContext>,
  'onDragCancel' | 'onDragEnd' | 'onDragStart' | 'sensors'
>;

type ProjectTasksBoardLoadMoreState = {
  error: Error | null;
  isFetchingNextPage: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  onRetry: () => void;
};

type ProjectTasksBoardContentProps = ProjectTasksBoardDndProps & {
  columns: ProjectTasksBoardColumnData[];
  columnState: ProjectTasksBoardColumnState;
  loadMoreState: ProjectTasksBoardLoadMoreState;
  projectId: string;
};

export function ProjectTasksBoardContent({
  columns,
  columnState,
  loadMoreState,
  onDragCancel,
  onDragEnd,
  onDragStart,
  projectId,
  sensors,
}: ProjectTasksBoardContentProps): ReactElement {
  return (
    <DndContext
      accessibility={{
        announcements: projectTasksBoardAnnouncements,
        screenReaderInstructions: projectTasksBoardScreenReaderInstructions,
      }}
      collisionDetection={closestCenter}
      onDragCancel={onDragCancel}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      sensors={sensors}
    >
      <div className="flex min-h-full w-max flex-col pb-4">
        <ProjectTasksBoardColumnList
          columns={columns}
          columnState={columnState}
          projectId={projectId}
        />
      </div>
      <ProjectTasksBoardLoadMore {...loadMoreState} />
    </DndContext>
  );
}
