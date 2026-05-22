'use client';

import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

type LoginMutationValues = {
  email: string;
  password: string;
};

export function useLoginMutation() {
  return useMutation({
    mutationFn: async ({ email, password }: LoginMutationValues) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
