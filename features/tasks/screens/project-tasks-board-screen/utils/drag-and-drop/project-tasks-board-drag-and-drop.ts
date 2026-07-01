import {
  defaultKeyboardCoordinateGetter,
  type KeyboardCoordinateGetter,
} from '@dnd-kit/core';
import type { TaskStatus } from '../../../add-new-task-screen/add-new-task-form-schema';
import {
  isBoardStatus,
  projectTasksBoardStatuses,
} from '../project-tasks-board-config';

export type ProjectTaskDragData = {
  sourceStatus: TaskStatus;
  taskId: string;
  taskTitle: string;
  type: 'task';
};

export type ProjectTaskDropData = {
  status: TaskStatus;
  type: 'column';
};

export function getTaskDragData(value: unknown): ProjectTaskDragData | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const data = value as Partial<ProjectTaskDragData>;

  return data.type === 'task' &&
    typeof data.taskId === 'string' &&
    data.taskId.trim() &&
    typeof data.taskTitle === 'string' &&
    typeof data.sourceStatus === 'string' &&
    isBoardStatus(data.sourceStatus)
    ? {
        sourceStatus: data.sourceStatus,
        taskId: data.taskId,
        taskTitle: data.taskTitle,
        type: 'task',
      }
    : null;
}

export function getColumnDropData(value: unknown): ProjectTaskDropData | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const data = value as Partial<ProjectTaskDropData>;

  return data.type === 'column' &&
    typeof data.status === 'string' &&
    isBoardStatus(data.status)
    ? { status: data.status, type: 'column' }
    : null;
}

const horizontalKeyboardCodes = new Set(['ArrowLeft', 'ArrowRight']);

export const projectTasksBoardKeyboardCoordinates: KeyboardCoordinateGetter = (
  event,
  args,
) => {
  if (!horizontalKeyboardCodes.has(event.code)) {
    return defaultKeyboardCoordinateGetter(event, args);
  }

  const { context, currentCoordinates } = args;
  const task = getTaskDragData(context.active?.data.current);
  const collisionRect = context.collisionRect;

  if (!task || !collisionRect) {
    return defaultKeyboardCoordinateGetter(event, args);
  }

  const currentColumn =
    getColumnDropData(context.over?.data.current)?.status ?? task.sourceStatus;
  const currentColumnIndex = projectTasksBoardStatuses.findIndex(
    ({ status }) => status === currentColumn,
  );
  const targetColumnIndex =
    currentColumnIndex + (event.code === 'ArrowRight' ? 1 : -1);
  const targetStatus = projectTasksBoardStatuses[targetColumnIndex]?.status;

  if (!targetStatus) {
    return currentCoordinates;
  }

  const targetRect = context.droppableRects.get(
    `project-tasks-column-${targetStatus}`,
  );

  if (!targetRect) {
    return defaultKeyboardCoordinateGetter(event, args);
  }

  const minY = targetRect.top;
  const maxY = targetRect.top + targetRect.height - collisionRect.height;
  const targetY =
    maxY >= minY
      ? Math.min(Math.max(collisionRect.top, minY), maxY)
      : targetRect.top;

  return {
    x: targetRect.left + (targetRect.width - collisionRect.width) / 2,
    y: targetY,
  };
};
