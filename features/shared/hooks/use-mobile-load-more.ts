'use client';

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

type UseMobileLoadMoreOptions = {
  hasMore: boolean;
  isFetchingNextPage: boolean;
  mediaQuery: string;
  onLoadMore: () => void;
  visibleError: unknown;
};

export function useMobileLoadMore({
  hasMore,
  isFetchingNextPage,
  mediaQuery,
  onLoadMore,
  visibleError,
}: UseMobileLoadMoreOptions): RefObject<HTMLDivElement | null> {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = loadMoreRef.current;

    if (!sentinel || !hasMore || isFetchingNextPage || visibleError) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0]?.isIntersecting &&
        window.matchMedia(mediaQuery).matches
      ) {
        observer.disconnect();
        onLoadMore();
      }
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isFetchingNextPage, mediaQuery, onLoadMore, visibleError]);

  return loadMoreRef;
}
