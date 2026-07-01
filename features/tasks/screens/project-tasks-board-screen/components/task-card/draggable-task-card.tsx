'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import type { ProjectTasksBoardTask } from '../../types';
import type { ProjectTaskDragData } from '../../utils';
import { TaskCard } from './task-card';

type DraggableTaskCardProps = {
  disabled: boolean;
  isPending: boolean;
  projectId: string;
  task: ProjectTasksBoardTask;
};

export function DraggableTaskCard({
  disabled,
  isPending,
  projectId,
  task,
}: DraggableTaskCardProps): ReactElement {
  const dragData: ProjectTaskDragData = {
    sourceStatus: task.status,
    taskId: task.id,
    taskTitle: task.title,
    type: 'task',
  };
  const {
    attributes,
    isDragging,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
  } = useDraggable({
    data: dragData,
    disabled,
    id: task.id,
  });

  return (
    <li
      aria-busy={isPending || undefined}
      className={joinClasses(
        'relative',
        isDragging && 'opacity-50',
        isPending && 'cursor-wait',
      )}
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
    >
      <TaskCard projectId={projectId} task={task} />
      <button
        {...attributes}
        {...listeners}
        aria-label={`Drag ${task.title} to another status column`}
        className={joinClasses(
          'bg-surface/95 text-text-tertiary hover:text-text-primary focus-visible:outline-primary absolute top-2 right-2 z-10 flex h-6 min-w-8 touch-none items-center justify-center rounded-md border border-[#c3c6d633] px-1 text-[9px] leading-none font-bold tracking-[0.08em] shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
          disabled && 'cursor-not-allowed opacity-60',
          isPending && 'cursor-wait',
        )}
        ref={setActivatorNodeRef}
        type="button"
      >
        <span aria-hidden="true">DRAG</span>
      </button>
    </li>
  );
}
