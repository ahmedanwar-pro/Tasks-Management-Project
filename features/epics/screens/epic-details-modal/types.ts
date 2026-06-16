export type EpicDetailsPerson = {
  avatarUrl?: string;
  initials: string;
  name: string;
};

export type EpicDetailsDisplayData = {
  assignee: EpicDetailsPerson | null;
  assigneeId: string | null;
  createdAt: string;
  createdBy: EpicDetailsPerson;
  deadline: string;
  deadlineValue: string;
  description: string;
  descriptionValue: string;
  epicKey: string;
  title: string;
};

export type EpicDetailsTaskAssignee = {
  avatarUrl?: string;
  initials: string;
  name: string;
};

export type EpicDetailsTask = {
  assignee: EpicDetailsTaskAssignee | null;
  dueDate: string;
  dueDateTime: string;
  id: string;
  isOverdue: boolean;
  title: string;
};
