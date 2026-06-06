'use client';

import { useEffect, useRef } from 'react';
import { mobileProjectEpicsViewportQuery } from '../../utils';

type UseMobileProjectEpicsLoadMoreOptions = {
  hasMoreEpics: boolean;
  isFetchingNextPage: boolean;
  onFetchNextPage: () => void;
  visibleError: unknown;
};

export function useMobileProjectEpicsLoadMore({
  hasMoreEpics,
  isFetchingNextPage,
  onFetchNextPage,
  visibleError,
}: UseMobileProjectEpicsLoadMoreOptions): React.RefObject<HTMLDivElement | null> {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = loadMoreRef.current;

    if (!sentinel || !hasMoreEpics || isFetchingNextPage || visibleError) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0]?.isIntersecting &&
        window.matchMedia(mobileProjectEpicsViewportQuery).matches
      ) {
        observer.disconnect();
        onFetchNextPage();
      }
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMoreEpics, isFetchingNextPage, onFetchNextPage, visibleError]);

  return loadMoreRef;
}
