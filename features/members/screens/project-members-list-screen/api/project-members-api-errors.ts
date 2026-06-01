export class ProjectMembersUnauthorizedError extends Error {
  readonly status = 401;

  constructor() {
    super('Your session has expired. Please log in again.');
    this.name = 'ProjectMembersUnauthorizedError';
  }
}

type ProjectMembersApiError = {
  code?: string;
  message?: string;
  status?: number;
};

export function isProjectMembersUnauthorizedResponse(
  error: ProjectMembersApiError,
): boolean {
  return (
    error.status === 401 ||
    error.code === 'PGRST301' ||
    /jwt|unauthorized|authentication/i.test(error.message ?? '')
  );
}

export function isProjectMembersUnauthorizedError(
  error: unknown,
): error is ProjectMembersUnauthorizedError {
  return (
    error instanceof ProjectMembersUnauthorizedError ||
    (error instanceof Error && 'status' in error && error.status === 401)
  );
}
