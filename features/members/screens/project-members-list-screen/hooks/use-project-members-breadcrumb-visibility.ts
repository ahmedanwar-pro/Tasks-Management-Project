'use client';

import { useEffect, useState } from 'react';

const projectMembersBreadcrumbViewportQuery = '(min-width: 1024px)';

export function useProjectMembersBreadcrumbVisibility(): boolean {
  const [isBreadcrumbVisible, setIsBreadcrumbVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(projectMembersBreadcrumbViewportQuery);

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
