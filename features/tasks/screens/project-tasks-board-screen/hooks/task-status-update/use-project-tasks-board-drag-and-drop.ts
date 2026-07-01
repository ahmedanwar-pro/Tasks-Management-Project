'use client';

import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  getColumnDropData,
  getTaskDragData,
  projectTasksBoardKeyboardCoordinates,
} from '../../utils';
import { useUpdateTaskStatusMutation } from './use-update-task-status-mutation';

type UseProjectTasksBoardDragAndDropOptions = {
  projectId: string;
  queryScopeKey: string;
  searchTerm: string;
};

export function useProjectTasksBoardDragAndDrop({
  projectId,
  queryScopeKey,
  searchTerm,
}: UseProjectTasksBoardDragAndDropOptions) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: projectTasksBoardKeyboardCoordinates,
    }),
  );
  const statusMutation = useUpdateTaskStatusMutation({
    projectId,
    queryScopeKey,
    searchTerm,
  });

  function handleDragStart(event: DragStartEvent): void {
    if (getTaskDragData(event.active.data.current)) {
      statusMutation.reset();
    }
  }

  function handleDragCancel(): void {
    // The cache is not changed until a valid drag end, so cancellation is a no-op.
  }

  function handleDragEnd(event: DragEndEvent): void {
    if (statusMutation.isPending) {
      return;
    }

    const task = getTaskDragData(event.active.data.current);
    const column = getColumnDropData(event.over?.data.current);

    if (!task || !column || task.sourceStatus === column.status) {
      return;
    }

    statusMutation.mutate({
      sourceStatus: task.sourceStatus,
      targetStatus: column.status,
      taskId: task.taskId,
    });
  }

  return {
    handleDragCancel,
    handleDragEnd,
    handleDragStart,
    pendingTaskId:
      statusMutation.isPending && statusMutation.variables
        ? statusMutation.variables.taskId
        : null,
    isStatusUpdatePending: statusMutation.isPending,
    resetStatusUpdate: statusMutation.reset,
    sensors,
    statusUpdateError: statusMutation.error,
  };
}
