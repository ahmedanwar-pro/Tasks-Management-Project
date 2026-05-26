'use client';

import { useMutation } from '@tanstack/react-query';
import { createProject } from '../api/create-project';

export function useCreateProjectMutation() {
  return useMutation({
    mutationFn: createProject,
  });
}
