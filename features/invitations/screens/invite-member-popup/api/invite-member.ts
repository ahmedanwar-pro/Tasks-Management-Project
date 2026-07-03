import { supabase } from '@/lib/supabase';
import {
  InviteMemberApiError,
  inviteMemberErrorMessages,
  mapInviteMemberError,
} from './invite-member-api-errors';

const inviteMemberRpcName = 'invite_member';

export type InviteMemberRequest = {
  email: string;
  projectId: string;
};

function getInviteMemberAppUrl(): string {
  if (typeof window === 'undefined') {
    throw new InviteMemberApiError(inviteMemberErrorMessages.unexpected);
  }

  return window.location.origin;
}

export async function inviteMember({
  email,
  projectId,
}: InviteMemberRequest): Promise<void> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw mapInviteMemberError(sessionError);
  }

  if (!session?.access_token) {
    throw new InviteMemberApiError(inviteMemberErrorMessages.unauthorized, 401);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    throw new InviteMemberApiError(inviteMemberErrorMessages.unexpected);
  }

  const { error, status } = await supabase.rpc(inviteMemberRpcName, {
    p_app_url: getInviteMemberAppUrl(),
    p_base_url: supabaseUrl,
    p_email: email,
    p_project_id: projectId,
  });

  if (error) {
    throw mapInviteMemberError({
      code: error.code,
      details: error.details,
      hint: error.hint,
      message: error.message,
      name: error.name,
      status,
    });
  }
}
