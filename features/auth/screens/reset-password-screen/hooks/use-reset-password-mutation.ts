'use client';

import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export type ResetPasswordRequest = {
  password: string;
};

export type ResetPasswordResponse = Awaited<
  ReturnType<typeof supabase.auth.updateUser>
>['data'];

async function updatePassword({
  password,
}: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) {
    throw error;
  }

  const { error: signOutError } = await supabase.auth.signOut({
    scope: 'local',
  });

  if (signOutError) {
    throw signOutError;
  }

  return data;
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: updatePassword,
  });
}
