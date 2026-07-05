export type AcceptInvitationApiErrorLike = {
  code?: string;
  details?: string;
  hint?: string;
  message?: string;
  name?: string;
  status?: number;
  statusCode?: number;
};

export function getAcceptInvitationErrorStatus(
  error: AcceptInvitationApiErrorLike,
): number | undefined {
  return error.status ?? error.statusCode;
}

export function getAcceptInvitationErrorContext(
  error: AcceptInvitationApiErrorLike,
): string {
  return [error.message, error.details, error.hint].filter(Boolean).join(' ');
}

export function isStructuredAlreadyAcceptedError(
  error: AcceptInvitationApiErrorLike,
): boolean {
  return (
    error.code === 'PT409' && error.details === 'INVITATION_ALREADY_ACCEPTED'
  );
}

export function isUnauthorizedAcceptInvitationError(
  error: AcceptInvitationApiErrorLike,
  context: string,
): boolean {
  return (
    getAcceptInvitationErrorStatus(error) === 401 ||
    error.code === 'PGRST301' ||
    /jwt|unauthorized|authentication|session.*(?:missing|expired)/i.test(
      context,
    )
  );
}

export function isUserMismatchError(context: string): boolean {
  return /email.*(?:mismatch|does not match|different|another)|(?:different|another|wrong).*(?:email|user|account)|(?:does not|doesn't|not).*(?:belong|match|intended).*(?:user|account|email)/i.test(
    context,
  );
}

export function isAlreadyAcceptedError(context: string): boolean {
  return /(?:invitation|invite|token).*(?:already\s+(?:used|accepted|redeemed)|used|accepted|redeemed)|(?:already\s+(?:used|accepted|redeemed)|used|accepted|redeemed).*(?:invitation|invite|token)/i.test(
    context,
  );
}

export function isExpiredInvitationError(context: string): boolean {
  return /expir(?:ed|y)|no longer valid/i.test(context);
}

export function isInvalidInvitationError(context: string): boolean {
  return /invalid|malformed|not found|unknown token/i.test(context);
}

export function isForbiddenAcceptInvitationError(
  error: AcceptInvitationApiErrorLike,
  context: string,
): boolean {
  return (
    getAcceptInvitationErrorStatus(error) === 403 ||
    /forbidden|insufficient privilege|permission denied/i.test(context)
  );
}

export function isNetworkAcceptInvitationError(
  error: AcceptInvitationApiErrorLike,
  context: string,
): boolean {
  return (
    /fetch|network|offline|connection|timeout/i.test(context) ||
    /AuthRetryableFetchError|FetchError|NetworkError/i.test(error.name ?? '')
  );
}
