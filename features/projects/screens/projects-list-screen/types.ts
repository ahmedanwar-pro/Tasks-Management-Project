import type { RefObject } from 'react';

export type ProjectListItem = {
  id: string;
  title: string;
  description: string;
  created_at?: string;
  createdAt: string;
};

export type ProjectCardSectionProps = {
  project: ProjectListItem;
};

export type ProjectsListScreenContentProps = {
  currentPage: number;
  hasMoreMobileProjects: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  onPageChange: (page: number) => void;
  onRetry: () => void;
  pageSize: number;
  projects: ProjectListItem[];
  totalCount: number;
  visibleError: unknown;
};

export type ProjectsListScreenData = ProjectsListScreenContentProps;
