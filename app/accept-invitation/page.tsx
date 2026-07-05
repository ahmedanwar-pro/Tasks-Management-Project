import type { Metadata } from 'next';
import { AcceptInvitationScreen } from '@/features/invitations';

export const metadata: Metadata = {
  title: 'Accept invitation | TASKLY',
};

type AcceptInvitationPageProps = {
  searchParams: Promise<{
    token?: string | string[];
  }>;
};

export default async function AcceptInvitationPage({
  searchParams,
}: AcceptInvitationPageProps): Promise<React.JSX.Element> {
  const { token } = await searchParams;
  const invitationToken = (Array.isArray(token) ? token[0] : token)?.trim();

  return <AcceptInvitationScreen invitationToken={invitationToken} />;
}
