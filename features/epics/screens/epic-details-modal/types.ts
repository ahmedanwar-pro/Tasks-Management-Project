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
  description: string;
  descriptionValue: string;
  epicKey: string;
  taskCount: number;
  title: string;
};
