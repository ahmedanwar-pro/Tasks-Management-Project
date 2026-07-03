'use client';

import { useMutation } from '@tanstack/react-query';
import { inviteMember } from '../api';

export function useInviteMemberMutation() {
  return useMutation({
    mutationFn: inviteMember,
    retry: false,
  });
}
