import { useEffect, useState } from 'react';

export type TaskDetailsPopupViewport = 'mobile' | 'tablet' | 'desktop';

export function useTaskDetailsPopupViewport(): TaskDetailsPopupViewport | null {
  const [viewport, setViewport] = useState<TaskDetailsPopupViewport | null>(
    null,
  );

  useEffect(() => {
    const tabletQuery = window.matchMedia('(min-width: 768px)');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    function updateViewport(): void {
      if (desktopQuery.matches) {
        setViewport('desktop');
        return;
      }

      if (tabletQuery.matches) {
        setViewport('tablet');
        return;
      }

      setViewport('mobile');
    }

    updateViewport();
    tabletQuery.addEventListener('change', updateViewport);
    desktopQuery.addEventListener('change', updateViewport);

    return () => {
      tabletQuery.removeEventListener('change', updateViewport);
      desktopQuery.removeEventListener('change', updateViewport);
    };
  }, []);

  return viewport;
}
