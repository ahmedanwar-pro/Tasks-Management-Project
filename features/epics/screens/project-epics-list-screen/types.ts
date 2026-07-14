import type { RefObject } from 'react';

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

export type ProjectEpicCardProps = {
  currentPage: number;
  epic: ProjectEpicListItem;
  hideOnMobile?: boolean;
  projectId: string;
};

export type ProjectEpicsListSectionProps = {
  currentPage: number;
  epics: ProjectEpicListItem[];
  hasMoreMobileEpics: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isSearchActive: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  onPageChange: (page: number) => void;
  pageSize: number;
  projectId: string;
  totalCount: number;
};

export type ProjectEpicsListScreenContentProps =
  ProjectEpicsListSectionProps & {
    isError: boolean;
    isRetrying: boolean;
    onRetry: () => void;
    onSearchTermChange: (value: string) => void;
    onSuccessToastClose: () => void;
    projectId: string;
    projectName: string;
    searchTerm: string;
    showSuccessToast: boolean;
    successMessage?: string;
  };

export type ProjectEpicsListScreenData = Omit<
  ProjectEpicsListScreenContentProps,
  'onSuccessToastClose' | 'projectId' | 'showSuccessToast' | 'successMessage'
>;
