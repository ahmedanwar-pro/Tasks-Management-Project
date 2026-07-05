import { supabase } from '@/lib/supabase';
import {
  acceptInvitationErrorMessages,
  AcceptInvitationApiError,
  mapAcceptInvitationError,
} from './accept-invitation-api-errors';

const acceptInvitationRpcName = 'accept_invitation';

export type AcceptInvitationRequest = {
  token: string;
};

type AcceptInvitationOutcome = 'accepted' | 'expired';

export async function acceptInvitation({
  token,
}: AcceptInvitationRequest): Promise<void> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw mapAcceptInvitationError(sessionError);
  }

  if (!session?.access_token) {
    throw new AcceptInvitationApiError(
      acceptInvitationErrorMessages.unauthorized,
      'unauthorized',
      401,
    );
  }

  const { data, error, status } = await supabase.rpc(acceptInvitationRpcName, {
    p_token: token,
  });

  if (error) {
    throw mapAcceptInvitationError({
      code: error.code,
      details: error.details,
      hint: error.hint,
      message: error.message,
      name: error.name,
      status,
    });
  }

  const outcome = data as AcceptInvitationOutcome | null;

  if (outcome === 'expired') {
    throw new AcceptInvitationApiError(
      acceptInvitationErrorMessages.expired,
      'expired',
      400,
    );
  }

  // Keep the rollout compatible with the previous void-returning RPC.
  if (outcome !== 'accepted' && outcome !== null) {
    throw new AcceptInvitationApiError(
      acceptInvitationErrorMessages.unexpected,
      'unexpected',
      status,
    );
  }
}
