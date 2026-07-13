export class StatisticsUnauthorizedError extends Error {
  readonly status = 401;

  constructor() {
    super('Your session has expired. Please log in again.');
    this.name = 'StatisticsUnauthorizedError';
  }
}

type StatisticsApiError = {
  code?: string;
  message?: string;
  status?: number;
};

export function isStatisticsUnauthorizedResponse(
  error: StatisticsApiError,
): boolean {
  return (
    error.status === 401 ||
    error.code === 'PGRST301' ||
    /jwt|unauthorized|authentication/i.test(error.message ?? '')
  );
}

export function isStatisticsUnauthorizedError(
  error: unknown,
): error is StatisticsUnauthorizedError {
  return (
    error instanceof StatisticsUnauthorizedError ||
    (error instanceof Error && 'status' in error && error.status === 401)
  );
}
