'use client';

import { useMutation } from '@tanstack/react-query';
import { acceptInvitation } from '../api';

export function useAcceptInvitationMutation() {
  return useMutation({
    mutationFn: acceptInvitation,
    retry: false,
  });
}
