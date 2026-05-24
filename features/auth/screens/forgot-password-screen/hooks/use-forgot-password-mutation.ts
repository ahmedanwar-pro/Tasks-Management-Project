'use client';

import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

type ForgotPasswordMutationValues = {
  email: string;
  redirectTo: string;
};

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: async ({ email, redirectTo }: ForgotPasswordMutationValues) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
