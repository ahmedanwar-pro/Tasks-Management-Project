'use client';

import { useCallback, useEffect, useState } from 'react';

const projectTasksBoardSearchDebounceMs = 400;

export function useProjectTasksBoardSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, projectTasksBoardSearchDebounceMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const onSearchTermChange = useCallback((value: string): void => {
    setSearchTerm(value);
  }, []);

  return {
    debouncedSearchTerm,
    isSearchPending: searchTerm.trim() !== debouncedSearchTerm,
    onSearchTermChange,
    searchTerm,
  };
}
