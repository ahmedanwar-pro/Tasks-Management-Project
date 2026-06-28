import type {
  BoardStatusConfig,
  ProjectTasksBoardTask,
} from '../project-tasks-board-screen/types';
import type { RefObject } from 'react';

export type ProjectTasksListItem = ProjectTasksBoardTask & {
  statusLabel: BoardStatusConfig['label'];
  statusBadgeClassName: BoardStatusConfig['badgeClassName'];
  taskId: string;
};

export type ProjectTasksListScreenData = {
  currentPage: number;
  hasMoreMobileTasks: boolean;
  hasPartialError: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isRetrying: boolean;
  isUnauthorized: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  onPageChange: (page: number) => void;
  onRetry: () => void;
  pageSize: number;
  tasks: ProjectTasksListItem[];
  totalCount: number;
};
