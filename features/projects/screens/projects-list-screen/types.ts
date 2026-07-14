import type { RefObject } from 'react';
import type { ProjectsListSuccessType } from './utils/projects-list-navigation';

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

export type ProjectCardDetailsProps = ProjectCardSectionProps & {
  currentPage: number;
};

export type ProjectsListScreenContentProps = {
  currentPage: number;
  hasMoreMobileProjects: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  onPageChange: (page: number) => void;
  onSuccessToastClose: () => void;
  onRetry: () => void;
  pageSize: number;
  projects: ProjectListItem[];
  successMessage?: string;
  showSuccessToast: boolean;
  totalCount: number;
  visibleError: unknown;
};

export type ProjectsListScreenData = Omit<
  ProjectsListScreenContentProps,
  | 'onSuccessToastClose'
  | 'successMessage'
  | 'showSuccessToast'
>;

export type ProjectsListScreenSuccessState = ProjectsListSuccessType;
