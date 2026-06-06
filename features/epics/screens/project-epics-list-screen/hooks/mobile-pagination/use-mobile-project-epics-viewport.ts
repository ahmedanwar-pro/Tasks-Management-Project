'use client';

import { useEffect, useState } from 'react';
import { mobileProjectEpicsViewportQuery } from '../../utils';

export function useMobileProjectEpicsViewport(
  onMobileViewport: () => void,
): boolean {
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(mobileProjectEpicsViewportQuery);

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
