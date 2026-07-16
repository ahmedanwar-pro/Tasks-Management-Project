import type { ReactElement } from 'react';
import { ProjectsListLoadingScreen } from './loading/projects-list-loading-screen';

function handleSearchChange(): void {}

export function ProjectsListPendingFallback(): ReactElement {
  return (
    <ProjectsListLoadingScreen
      currentPage={1}
      isPaginationLoading={false}
      isSearchInputDisabled
      onSearchTermChange={handleSearchChange}
      searchTerm=""
    />
  );
}
