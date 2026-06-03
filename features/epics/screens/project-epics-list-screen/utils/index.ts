export type ProjectEpicListItem = {
  id: string;
  epic_id: string;
  title: string;
  assignee: {
    name: string;
    initials: string;
  };
  createdBy: {
    name: string;
  };
  createdDate: string;
  createdDateTime: string;
};

export const sampleEpics: ProjectEpicListItem[] = [
  {
    id: 'epic-204-a',
    epic_id: 'EPIC-204',
    title: 'Infrastructure Modernization: Phase 2',
    assignee: {
      name: 'John Doe',
      initials: 'JD',
    },
    createdBy: {
      name: 'Sarah Jenkins',
    },
    createdDate: 'Oct 24, 2023',
    createdDateTime: '2023-10-24',
  },
  {
    id: 'epic-204-b',
    epic_id: 'EPIC-204',
    title: 'Infrastructure Modernization: Phase 2',
    assignee: {
      name: 'John Doe',
      initials: 'JD',
    },
    createdBy: {
      name: 'Sarah Jenkins',
    },
    createdDate: 'Oct 24, 2023',
    createdDateTime: '2023-10-24',
  },
  {
    id: 'epic-204-c',
    epic_id: 'EPIC-204',
    title: 'Infrastructure Modernization: Phase 2',
    assignee: {
      name: 'John Doe',
      initials: 'JD',
    },
    createdBy: {
      name: 'Sarah Jenkins',
    },
    createdDate: 'Oct 24, 2023',
    createdDateTime: '2023-10-24',
  },
  {
    id: 'epic-204-d',
    epic_id: 'EPIC-204',
    title: 'Infrastructure Modernization: Phase 2',
    assignee: {
      name: 'John Doe',
      initials: 'JD',
    },
    createdBy: {
      name: 'Sarah Jenkins',
    },
    createdDate: 'Oct 24, 2023',
    createdDateTime: '2023-10-24',
  },
  {
    id: 'epic-204-e',
    epic_id: 'EPIC-204',
    title: 'Sustainable Materials Integration',
    assignee: {
      name: 'Alice Moore',
      initials: 'AM',
    },
    createdBy: {
      name: 'Sarah Jenkins',
    },
    createdDate: '22 Oct 2025',
    createdDateTime: '2025-10-22',
  },
  {
    id: 'epic-204-f',
    epic_id: 'EPIC-204',
    title: 'Sustainable Materials Integration',
    assignee: {
      name: 'Alice Moore',
      initials: 'AM',
    },
    createdBy: {
      name: 'Sarah Jenkins',
    },
    createdDate: '22 Oct 2025',
    createdDateTime: '2025-10-22',
  },
];
