'use client';

import { useEffect, useRef } from 'react';
import { mobileProjectsViewportQuery } from '../../utils/projects-pagination';

type UseMobileProjectsLoadMoreOptions = {
  hasMoreProjects: boolean;
  isFetchingNextPage: boolean;
  onFetchNextPage: () => void;
  visibleError: unknown;
};

export function useMobileProjectsLoadMore({
  hasMoreProjects,
  isFetchingNextPage,
  onFetchNextPage,
  visibleError,
}: UseMobileProjectsLoadMoreOptions): React.RefObject<HTMLDivElement | null> {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = loadMoreRef.current;

    if (!sentinel || !hasMoreProjects || isFetchingNextPage || visibleError) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0]?.isIntersecting &&
        window.matchMedia(mobileProjectsViewportQuery).matches
      ) {
        observer.disconnect();
        onFetchNextPage();
      }
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMoreProjects, isFetchingNextPage, onFetchNextPage, visibleError]);

  return loadMoreRef;
}
