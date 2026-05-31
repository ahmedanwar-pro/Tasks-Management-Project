'use client';

import { useEffect, useRef, useState } from 'react';
import { mobileProjectsViewportQuery } from '../utils/projects-pagination';

type UseMobileProjectsLoadMoreOptions = {
  hasMoreProjects: boolean;
  isFetchingNextPage: boolean;
  onFetchNextPage: () => void;
  visibleError: unknown;
};

export function useMobileProjectsViewport(onMobileViewport: () => void): boolean {
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(mobileProjectsViewportQuery);

    function handleViewportChange(): void {
      const matchesMobileViewport = mediaQuery.matches;

      setIsMobileViewport(matchesMobileViewport);

      if (matchesMobileViewport) {
        onMobileViewport();
      }
    }

    handleViewportChange();
    mediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, [onMobileViewport]);

  return isMobileViewport;
}

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
