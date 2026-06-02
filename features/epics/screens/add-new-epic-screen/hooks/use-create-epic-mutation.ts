'use client';

import { useMutation } from '@tanstack/react-query';
import { createEpic } from '../api';

export function useCreateEpicMutation() {
  return useMutation({
    mutationFn: createEpic,
  });
}
