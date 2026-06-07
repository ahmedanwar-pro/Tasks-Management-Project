export type EpicDetailsPerson = {
  avatarUrl?: string;
  initials: string;
  name: string;
};

export type EpicDetailsDisplayData = {
  assignee: EpicDetailsPerson | null;
  createdAt: string;
  createdBy: EpicDetailsPerson;
  deadline: string;
  description: string;
  epicKey: string;
  taskCount: number;
  title: string;
};
