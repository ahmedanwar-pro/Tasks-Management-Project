export type TaskDetailsPersonInfo = {
  initials: string;
  name: string;
  role: string;
};

export type TaskDetailsPopupMock = {
  assignee: TaskDetailsPersonInfo;
  createdAt: string;
  description: string;
  dueDate: string;
  epicLabel: string;
  reporter: TaskDetailsPersonInfo;
  status: string;
  taskKey: string;
  title: string;
};
