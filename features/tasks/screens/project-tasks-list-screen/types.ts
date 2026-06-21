import type {
  BoardStatusConfig,
  ProjectTasksBoardTask,
} from '../project-tasks-board-screen/types';

export type ProjectTasksListItem = ProjectTasksBoardTask & {
  statusLabel: BoardStatusConfig['label'];
  statusBadgeClassName: BoardStatusConfig['badgeClassName'];
  taskId: string;
};

export type ProjectTasksListScreenData = {
  hasPartialError: boolean;
  isError: boolean;
  isLoading: boolean;
  isUnauthorized: boolean;
  onRetry: () => void;
  tasks: ProjectTasksListItem[];
};
