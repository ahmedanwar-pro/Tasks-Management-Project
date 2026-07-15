'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const projectsSearchDebounceMs = 400;

export function useProjectsSearch(
  initialSearchTerm: string,
  onDebouncedSearchChange: () => void,
) {
  const normalizedInitialSearchTerm = initialSearchTerm.trim();
  const [hasSearchInteracted, setHasSearchInteracted] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    normalizedInitialSearchTerm,
  );
  const committedSearchTermRef = useRef(normalizedInitialSearchTerm);

  useEffect(() => {
    const normalizedSearchTerm = initialSearchTerm.trim();

    if (normalizedSearchTerm === committedSearchTermRef.current) {
      return;
    }

    committedSearchTermRef.current = normalizedSearchTerm;
    setSearchTerm(initialSearchTerm);
    setDebouncedSearchTerm(normalizedSearchTerm);
  }, [initialSearchTerm]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const normalizedSearchTerm = searchTerm.trim();

      if (normalizedSearchTerm === committedSearchTermRef.current) {
        return;
      }

      committedSearchTermRef.current = normalizedSearchTerm;
      setDebouncedSearchTerm(normalizedSearchTerm);
      onDebouncedSearchChange();
    }, projectsSearchDebounceMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [onDebouncedSearchChange, searchTerm]);

  const onSearchTermChange = useCallback((value: string) => {
    setHasSearchInteracted(true);
    setSearchTerm(value);
  }, []);

  return {
    debouncedSearchTerm,
    hasSearchInteracted,
    onSearchTermChange,
    searchTerm,
  };
}
