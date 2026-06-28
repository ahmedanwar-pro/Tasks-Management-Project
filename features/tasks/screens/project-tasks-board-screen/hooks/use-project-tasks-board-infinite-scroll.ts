'use client';

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

type UseProjectTasksBoardInfiniteScrollOptions = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  visibleError: unknown;
};

type ProjectTasksBoardInfiniteScrollRefs = {
  loadMoreRef: RefObject<HTMLDivElement | null>;
  scrollContainerRef: RefObject<HTMLElement | null>;
};

export function useProjectTasksBoardInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  visibleError,
}: UseProjectTasksBoardInfiniteScrollOptions): ProjectTasksBoardInfiniteScrollRefs {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = scrollContainerRef.current;
    const sentinel = loadMoreRef.current;

    if (
      !root ||
      !sentinel ||
      !hasNextPage ||
      isFetchingNextPage ||
      visibleError
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();
          onLoadMore();
        }
      },
      { root },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore, visibleError]);

  return {
    loadMoreRef,
    scrollContainerRef,
  };
}
