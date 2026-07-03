import {
  getErrorStatus,
  getInviteMemberErrorContext,
  isAlreadyInvitedError,
  isAlreadyMemberError,
  isForbiddenError,
  isNetworkError,
  isUnauthorizedError,
} from './invite-member-error-guards';
import type { InviteMemberApiErrorLike } from './invite-member-error-guards';

export const inviteMemberErrorMessages = {
  alreadyInvited: 'This user has already been invited to the project.',
  alreadyMember: 'This user is already a member of this project.',
  forbidden: 'You do not have permission to invite members to this project.',
  invalidRequest: 'Enter a valid email address and try again.',
  network: 'Unable to connect. Check your internet connection and try again.',
  unauthorized: 'Your session has expired. Please log in again.',
  unexpected: 'Unable to send the invitation. Please try again.',
} as const;

export class InviteMemberApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'InviteMemberApiError';
    this.status = status;
  }
}

export function mapInviteMemberError(
  error: InviteMemberApiErrorLike,
): InviteMemberApiError {
  const message = error.message ?? '';
  const context = getInviteMemberErrorContext(error);
  const status = getErrorStatus(error);

  if (isUnauthorizedError(error)) {
    return new InviteMemberApiError(
      inviteMemberErrorMessages.unauthorized,
      401,
    );
  }

  if (isForbiddenError(error)) {
    return new InviteMemberApiError(inviteMemberErrorMessages.forbidden, 403);
  }

  if (isAlreadyInvitedError(context)) {
    return new InviteMemberApiError(
      inviteMemberErrorMessages.alreadyInvited,
      status,
    );
  }

  if (isAlreadyMemberError(context)) {
    return new InviteMemberApiError(
      inviteMemberErrorMessages.alreadyMember,
      status,
    );
  }

  if (
    status === 400 ||
    status === 422 ||
    /invalid (?:request|email)|email.*invalid|malformed/i.test(message)
  ) {
    return new InviteMemberApiError(
      inviteMemberErrorMessages.invalidRequest,
      status,
    );
  }

  if (isNetworkError(error)) {
    return new InviteMemberApiError(inviteMemberErrorMessages.network, status);
  }

  return new InviteMemberApiError(inviteMemberErrorMessages.unexpected, status);
}
