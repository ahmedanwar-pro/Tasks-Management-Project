import {
  getAcceptInvitationErrorContext,
  getAcceptInvitationErrorStatus,
  isAlreadyAcceptedError,
  isExpiredInvitationError,
  isForbiddenAcceptInvitationError,
  isInvalidInvitationError,
  isNetworkAcceptInvitationError,
  isStructuredAlreadyAcceptedError,
  isUnauthorizedAcceptInvitationError,
  isUserMismatchError,
} from './accept-invitation-error-guards';
import type { AcceptInvitationApiErrorLike } from './accept-invitation-error-guards';

export type AcceptInvitationErrorKind =
  | 'already-accepted'
  | 'expired'
  | 'forbidden'
  | 'invalid-token'
  | 'network'
  | 'unauthorized'
  | 'user-mismatch'
  | 'unexpected';

export const acceptInvitationErrorMessages = {
  alreadyAccepted: 'This invitation has already been used.',
  expired: 'This invitation has expired.',
  forbidden: 'You are not allowed to accept this invitation.',
  invalidToken: 'This invitation link is invalid.',
  network: 'Unable to connect. Check your internet connection and try again.',
  unauthorized: 'Your session has expired. Please log in again.',
  unexpected: 'Unable to accept the invitation. Please try again.',
  userMismatch: 'This invitation cannot be accepted by the current account.',
} as const;

export class AcceptInvitationApiError extends Error {
  readonly kind: AcceptInvitationErrorKind;
  readonly status?: number;

  constructor(
    message: string,
    kind: AcceptInvitationErrorKind,
    status?: number,
  ) {
    super(message);
    this.name = 'AcceptInvitationApiError';
    this.kind = kind;
    this.status = status;
  }
}

export function mapAcceptInvitationError(
  error: AcceptInvitationApiErrorLike,
): AcceptInvitationApiError {
  const status = getAcceptInvitationErrorStatus(error);
  const context = getAcceptInvitationErrorContext(error);

  if (isStructuredAlreadyAcceptedError(error)) {
    return new AcceptInvitationApiError(
      acceptInvitationErrorMessages.alreadyAccepted,
      'already-accepted',
      409,
    );
  }

  if (isUnauthorizedAcceptInvitationError(error, context)) {
    return new AcceptInvitationApiError(
      acceptInvitationErrorMessages.unauthorized,
      'unauthorized',
      401,
    );
  }

  if (isUserMismatchError(context)) {
    return new AcceptInvitationApiError(
      acceptInvitationErrorMessages.userMismatch,
      'user-mismatch',
      status,
    );
  }

  if (isAlreadyAcceptedError(context)) {
    return new AcceptInvitationApiError(
      acceptInvitationErrorMessages.alreadyAccepted,
      'already-accepted',
      status,
    );
  }

  if (isExpiredInvitationError(context)) {
    return new AcceptInvitationApiError(
      acceptInvitationErrorMessages.expired,
      'expired',
      status,
    );
  }

  if (isInvalidInvitationError(context)) {
    return new AcceptInvitationApiError(
      acceptInvitationErrorMessages.invalidToken,
      'invalid-token',
      status,
    );
  }

  if (isForbiddenAcceptInvitationError(error, context)) {
    return new AcceptInvitationApiError(
      acceptInvitationErrorMessages.forbidden,
      'forbidden',
      403,
    );
  }

  if (isNetworkAcceptInvitationError(error, context)) {
    return new AcceptInvitationApiError(
      acceptInvitationErrorMessages.network,
      'network',
      status,
    );
  }

  return new AcceptInvitationApiError(
    acceptInvitationErrorMessages.unexpected,
    'unexpected',
    status,
  );
}

export function isAcceptInvitationUnauthorizedError(
  error: unknown,
): error is AcceptInvitationApiError {
  return (
    error instanceof AcceptInvitationApiError && error.kind === 'unauthorized'
  );
}
