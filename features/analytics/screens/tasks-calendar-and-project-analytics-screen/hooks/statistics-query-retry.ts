import { isProjectsUnauthorizedError } from '@/features/projects/screens/projects-list-screen/api/get-projects';
import { isStatisticsUnauthorizedError } from '../api';

const defaultClientRetryCount = 3;

export function shouldRetryStatisticsQuery(
  failureCount: number,
  error: Error,
): boolean {
  return (
    !isStatisticsUnauthorizedError(error) &&
    !isProjectsUnauthorizedError(error) &&
    failureCount < defaultClientRetryCount
  );
}
