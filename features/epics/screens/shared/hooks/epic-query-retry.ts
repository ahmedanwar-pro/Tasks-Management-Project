import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api';

const defaultClientRetryCount = 3;

export function shouldRetryEpicQuery(failureCount: number, error: Error) {
  return (
    !isProjectUnauthorizedError(error) && failureCount < defaultClientRetryCount
  );
}
