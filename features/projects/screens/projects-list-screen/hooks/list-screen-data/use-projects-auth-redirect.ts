'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useProjectsAuthRedirect(isUnauthorized: boolean): void {
  const router = useRouter();

  useEffect(() => {
    if (isUnauthorized) {
      router.replace('/login');
    }
  }, [isUnauthorized, router]);
}
