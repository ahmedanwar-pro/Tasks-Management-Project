export type ProjectEpicListItem = {
  id: string;
  epic_id: string;
  title: string;
  assignee: {
    avatarUrl?: string;
    name: string;
    initials: string;
  };
  createdBy: {
    name: string;
  };
  createdDate: string;
  createdDateTime: string;
  deadline: string;
};
