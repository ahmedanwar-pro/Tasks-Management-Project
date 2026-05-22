'use client';

import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

type SignUpMutationValues = {
  department: string;
  email: string;
  name: string;
  password: string;
};

export function useSignUpMutation() {
  return useMutation({
    mutationFn: async ({
      department,
      email,
      name,
      password,
    }: SignUpMutationValues) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        options: {
          data: {
            department,
            name,
          },
        },
        password,
      });

      if (error) {
        throw error;
      }

      return data;
    },
  });
}
