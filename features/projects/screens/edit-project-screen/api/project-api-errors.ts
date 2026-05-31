export class ProjectUnauthorizedError extends Error {
  readonly status = 401;

  constructor() {
    super('Your session has expired. Please log in again.');
    this.name = 'ProjectUnauthorizedError';
  }
}

type ProjectApiError = {
  code?: string;
  message?: string;
  status?: number;
};

export function isProjectUnauthorizedResponse(error: ProjectApiError): boolean {
  return (
    error.status === 401 ||
    error.code === 'PGRST301' ||
    /jwt|unauthorized|authentication/i.test(error.message ?? '')
  );
}

export function isProjectUnauthorizedError(
  error: unknown,
): error is ProjectUnauthorizedError {
  return (
    error instanceof ProjectUnauthorizedError ||
    (error instanceof Error && 'status' in error && error.status === 401)
  );
}
