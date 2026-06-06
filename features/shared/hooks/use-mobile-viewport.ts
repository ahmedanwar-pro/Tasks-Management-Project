'use client';

import { useEffect, useState } from 'react';

type UseMobileViewportOptions = {
  mediaQuery: string;
  onMobileViewport: () => void;
};

export function useMobileViewport({
  mediaQuery,
  onMobileViewport,
}: UseMobileViewportOptions): boolean {
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const viewportQuery = window.matchMedia(mediaQuery);

    function handleViewportChange(): void {
      const matchesMobileViewport = viewportQuery.matches;

      setIsMobileViewport(matchesMobileViewport);

      if (matchesMobileViewport) {
        onMobileViewport();
      }
    }

    handleViewportChange();
    viewportQuery.addEventListener('change', handleViewportChange);

    return () => {
      viewportQuery.removeEventListener('change', handleViewportChange);
    };
  }, [mediaQuery, onMobileViewport]);

  return isMobileViewport;
}
