import type { TaskStatus } from '../add-new-task-screen/add-new-task-form-schema';

export type TaskDetailsPersonInfo = {
  initials: string;
  jobTitle?: string;
  name: string;
  role: string;
};

export type TaskDetailsCopyFeedback = {
  error?: string;
  success?: string;
};

export type TaskDetailsPopupDetails = {
  assignee: TaskDetailsPersonInfo;
  assigneeId: string | null;
  createdAt: string;
  description: string;
  descriptionValue: string;
  dueDate: string;
  dueDateValue: string;
  epicId: string | null;
  epicLabel: string;
  reporter: TaskDetailsPersonInfo;
  status: TaskStatus | null;
  statusLabel: string;
  taskKey: string;
  title: string;
};
