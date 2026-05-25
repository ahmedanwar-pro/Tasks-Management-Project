'use client';

import { useMutation } from '@tanstack/react-query';
import { clearAuthSessionPersistence, supabase } from '@/lib/supabase';

async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut({ scope: 'local' });

  if (error) {
    throw error;
  }

  clearAuthSessionPersistence();
}

export function useLogoutMutation() {
  return useMutation({
    mutationFn: logout,
  });
}
