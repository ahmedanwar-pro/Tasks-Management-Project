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
