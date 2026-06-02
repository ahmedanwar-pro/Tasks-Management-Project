'use client';

import { useEffect, useState } from 'react';

const addNewEpicBreadcrumbViewportQuery = '(min-width: 1024px)';

export function useAddNewEpicBreadcrumbVisibility(): boolean {
  const [isBreadcrumbVisible, setIsBreadcrumbVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(addNewEpicBreadcrumbViewportQuery);

    function handleViewportChange(): void {
      setIsBreadcrumbVisible(mediaQuery.matches);
    }

    handleViewportChange();
    mediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);

  return isBreadcrumbVisible;
}
