type ProjectSummary = {
  id: string;
  title: string;
  description: string;
  created_at?: string;
  createdAt: string;
};

type ProjectCardSectionProps = {
  project: ProjectSummary;
};

export type { ProjectCardSectionProps, ProjectSummary };
