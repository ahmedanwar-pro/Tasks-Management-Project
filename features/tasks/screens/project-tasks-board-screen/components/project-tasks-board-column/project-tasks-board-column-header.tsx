import type { ReactElement } from 'react';
import type { TaskStatus } from '../../../add-new-task-screen/add-new-task-form-schema';
import type { BoardStatusConfig } from '../../types';
import { AddTaskButton } from '../controls';

type ProjectTasksBoardColumnHeaderProps = {
  config: BoardStatusConfig;
  error: Error | null;
  isPending: boolean;
  projectId: string;
  taskCount: number;
};

export function ProjectTasksBoardColumnHeader({
  config,
  error,
  isPending,
  projectId,
  taskCount,
}: ProjectTasksBoardColumnHeaderProps): ReactElement {
  return (
    <div className="bg-background sticky top-0 z-10 flex items-center justify-between gap-3 px-1">
      <div className="flex min-w-0 items-center gap-2">
        <span
          aria-hidden="true"
          className={`size-2 shrink-0 rounded-lg ${config.accentClassName}`}
        />
        <h2
          className="flex h-[17px] items-center truncate text-[11px] leading-[16.5px] font-bold tracking-[1.1px] text-[#64748b]"
          id={`project-tasks-${config.status}`}
        >
          {config.label}
        </h2>
        {!isPending && !error ? (
          <span
            className={`inline-flex h-[19px] items-center justify-center rounded-[2px] px-[6px] py-[2px] text-[10px] leading-[15px] font-bold ${config.badgeClassName}`}
          >
            {taskCount}
          </span>
        ) : null}
      </div>
      <AddTaskButton
        compact
        projectId={projectId}
        status={config.status as TaskStatus}
      />
    </div>
  );
}
