import type { Announcements, ScreenReaderInstructions } from '@dnd-kit/core';
import {
  isBoardStatus,
  projectTasksBoardStatuses,
} from '../project-tasks-board-config';

function getColumnLabel(value: unknown): string | null {
  if (!value || typeof value !== 'object' || !('status' in value)) {
    return null;
  }

  const status = value.status;

  if (typeof status !== 'string' || !isBoardStatus(status)) {
    return null;
  }

  return (
    projectTasksBoardStatuses.find((config) => config.status === status)
      ?.label ?? null
  );
}

function getTaskTitle(value: unknown): string {
  return value && typeof value === 'object' && 'taskTitle' in value
    ? String(value.taskTitle)
    : 'Task';
}

export const projectTasksBoardScreenReaderInstructions: ScreenReaderInstructions =
  {
    draggable:
      'To pick up a task, press Space or Enter. Use the arrow keys to move it to another status column. Press Space or Enter to drop, or Escape to cancel.',
  };

export const projectTasksBoardAnnouncements: Announcements = {
  onDragCancel({ active }) {
    return `${getTaskTitle(active.data.current)} drag cancelled.`;
  },
  onDragEnd({ active, over }) {
    const columnLabel = getColumnLabel(over?.data.current);

    return columnLabel
      ? `${getTaskTitle(active.data.current)} dropped in ${columnLabel}.`
      : `${getTaskTitle(active.data.current)} returned to its original column.`;
  },
  onDragOver({ active, over }) {
    const columnLabel = getColumnLabel(over?.data.current);

    return columnLabel
      ? `${getTaskTitle(active.data.current)} is over ${columnLabel}.`
      : undefined;
  },
  onDragStart({ active }) {
    return `${getTaskTitle(active.data.current)} picked up.`;
  },
};
