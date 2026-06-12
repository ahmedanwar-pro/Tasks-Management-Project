'use client';

import type { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { clearUser, setUser } from '@/store/features/user/user-slice';
import { selectCurrentUser } from '@/store/features/user/user-selectors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { AppUser } from '../types';

const fallbackUserName = 'User';

function getMetadataText(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function mapCurrentUser(user: User | null): AppUser | null {
  if (!user) {
    return null;
  }

  return {
    jobTitle: getMetadataText(user.user_metadata.department),
    name: getMetadataText(user.user_metadata.name) ?? fallbackUserName,
  };
}

export function useCurrentUser() {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    let isActive = true;

    function applyCurrentUser(currentUser: AppUser | null): void {
      if (currentUser) {
        dispatch(setUser(currentUser));
        return;
      }

      dispatch(clearUser());
    }

    async function hydrateCurrentUser(): Promise<void> {
      const { data, error } = await supabase.auth.getSession();

      if (!isActive) {
        return;
      }

      applyCurrentUser(error ? null : mapCurrentUser(data.session?.user ?? null));
      setIsPending(false);
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isActive) {
        return;
      }

      if (event === 'SIGNED_OUT') {
        dispatch(clearUser());
        setIsPending(false);
        return;
      }

      applyCurrentUser(mapCurrentUser(session?.user ?? null));
      setIsPending(false);
    });

    void hydrateCurrentUser();

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return { data: user, isPending };
}
