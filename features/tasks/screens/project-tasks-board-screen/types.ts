import type { TaskStatus } from '../add-new-task-screen/add-new-task-form-schema';

export type ProjectTasksBoardAssignee = {
  avatarUrl?: string;
  initials: string;
  name: string;
};

export type ProjectTasksBoardTask = {
  assignee: ProjectTasksBoardAssignee | null;
  dueDate: string;
  dueDateTime: string;
  id: string;
  isDone: boolean;
  isOverdue: boolean;
  status: TaskStatus;
  title: string;
};

export type BoardStatusConfig = {
  accentClassName: string;
  badgeClassName: string;
  label: string;
  status: TaskStatus;
};

export type ProjectTasksBoardColumnData = {
  config: BoardStatusConfig;
  error: Error | null;
  isPending: boolean;
  onRetry: () => void;
  tasks: ProjectTasksBoardTask[];
  totalCount: number;
};

export type ProjectTasksBoardQueryDefinition = {
  enabled: boolean;
  page: number;
  status: TaskStatus;
};

export type ProjectTasksBoardData = {
  columns: ProjectTasksBoardColumnData[];
  hasNextPage: boolean;
  hasBoardError: boolean;
  isBoardEmpty: boolean;
  isFetchingNextPage: boolean;
  isSearchActive: boolean;
  loadMoreError: Error | null;
  loadNextPage: () => void;
  retryBoard: () => void;
  retryNextPage: () => void;
};
