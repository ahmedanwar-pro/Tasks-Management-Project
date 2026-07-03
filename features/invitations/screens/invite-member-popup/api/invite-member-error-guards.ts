export type InviteMemberApiErrorLike = {
  code?: string;
  details?: string;
  hint?: string;
  message?: string;
  name?: string;
  status?: number;
  statusCode?: number;
};

export function getErrorStatus(
  error: InviteMemberApiErrorLike,
): number | undefined {
  return error.status ?? error.statusCode;
}

export function isUnauthorizedError(error: InviteMemberApiErrorLike): boolean {
  return (
    getErrorStatus(error) === 401 ||
    error.code === 'PGRST301' ||
    /jwt|unauthorized|authentication/i.test(error.message ?? '')
  );
}

export function isForbiddenError(error: InviteMemberApiErrorLike): boolean {
  return (
    getErrorStatus(error) === 403 ||
    /forbidden|insufficient privilege|permission denied/i.test(
      error.message ?? '',
    )
  );
}

export function isNetworkError(error: InviteMemberApiErrorLike): boolean {
  return (
    /fetch|network|offline|connection|timeout/i.test(error.message ?? '') ||
    /AuthRetryableFetchError|FetchError|NetworkError/i.test(error.name ?? '')
  );
}

export function getInviteMemberErrorContext(
  error: InviteMemberApiErrorLike,
): string {
  return [error.message, error.details, error.hint].filter(Boolean).join(' ');
}

export function isAlreadyInvitedError(context: string): boolean {
  return (
    /\b(?:invite|invited|invitation|invitations)\b/i.test(context) &&
    /\b(?:already|duplicate|exists?|pending|previously|sent)\b/i.test(context)
  );
}

export function isAlreadyMemberError(context: string): boolean {
  return (
    /\b(?:member|membership|project_members?)\b/i.test(context) &&
    /\b(?:already|duplicate|exists?|joined|current)\b/i.test(context)
  );
}
