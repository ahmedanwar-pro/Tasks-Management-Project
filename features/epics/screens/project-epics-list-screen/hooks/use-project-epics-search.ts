'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const projectEpicsSearchDebounceMs = 400;

export function useProjectEpicsSearch(onDebouncedSearchChange: () => void) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const committedSearchTermRef = useRef('');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const normalizedSearchTerm = searchTerm.trim();

      if (normalizedSearchTerm === committedSearchTermRef.current) {
        return;
      }

      committedSearchTermRef.current = normalizedSearchTerm;
      setDebouncedSearchTerm(normalizedSearchTerm);
      onDebouncedSearchChange();
    }, projectEpicsSearchDebounceMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [onDebouncedSearchChange, searchTerm]);

  const onSearchTermChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return {
    debouncedSearchTerm,
    onSearchTermChange,
    searchTerm,
  };
}
