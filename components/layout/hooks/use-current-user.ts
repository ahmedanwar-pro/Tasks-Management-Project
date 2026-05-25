'use client';

import type { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
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
  const [user, setUser] = useState<AppUser | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsPending(false);
        return;
      }

      setUser(mapCurrentUser(session?.user ?? null));
      setIsPending(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { data: user, isPending };
}
