'use client';

import { useMutation } from '@tanstack/react-query';
import { setAuthSessionPersistence, supabase } from '@/lib/supabase';

type LoginMutationValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export function useLoginMutation() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
      rememberMe,
    }: LoginMutationValues) => {
      const restorePersistencePreference =
        setAuthSessionPersistence(rememberMe);

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        return data;
      } catch (error) {
        restorePersistencePreference();
        throw error;
      }
    },
  });
}
