import type { ReactElement, ReactNode } from 'react';
import { ProjectsListHeader } from '../header/projects-list-header';
import { MobileCreateProjectButton } from '../list/mobile-create-project-button';
import { ProjectsSearchInput } from '../list/projects-search-input';
import { ProjectsListLoadingState } from './projects-list-loading-state';

type ProjectsListLoadingScreenProps = {
  currentPage: number;
  headerChildren?: ReactNode;
  isPaginationLoading: boolean;
  isSearchInputDisabled: boolean;
  onSearchTermChange: (value: string) => void;
  pagination?: ReactElement;
  searchTerm: string;
};

export function ProjectsListLoadingScreen({
  currentPage,
  headerChildren,
  isPaginationLoading,
  isSearchInputDisabled,
  onSearchTermChange,
  pagination,
  searchTerm,
}: ProjectsListLoadingScreenProps): ReactElement {
  return (
    <section
      aria-labelledby="projects-title"
      className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pt-8 pb-8 lg:h-[calc(100dvh-4rem)] lg:px-8 lg:pt-7"
    >
      <ProjectsListHeader currentPage={currentPage}>
        {headerChildren}
      </ProjectsListHeader>
      <div className="md:mt-7 md:rounded-lg md:border md:border-[#dfe7f8] md:bg-[#f8faff] md:p-1 md:shadow-[0px_1px_3px_rgba(45,79,140,0.08)]">
        <div className="md:rounded-md md:bg-[#f8faff] md:px-6 md:pt-5 md:pb-0">
          <ProjectsSearchInput
            disabled={isSearchInputDisabled}
            onChange={onSearchTermChange}
            value={searchTerm}
          />
          <ProjectsListLoadingState
            isPaginationLoading={isPaginationLoading}
            pagination={pagination}
          />
        </div>
      </div>
      <MobileCreateProjectButton currentPage={currentPage} />
    </section>
  );
}
