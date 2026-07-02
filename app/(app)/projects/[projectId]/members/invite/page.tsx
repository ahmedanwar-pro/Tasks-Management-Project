import { InviteMemberPopup } from '@/features/invitations';
import { ProjectMembersListScreen } from '@/features/members';

type InviteMemberPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function InviteMemberPage({
  params,
}: InviteMemberPageProps) {
  const { projectId } = await params;

  return (
    <>
      <ProjectMembersListScreen projectId={projectId} />
      <InviteMemberPopup projectId={projectId} />
    </>
  );
}
