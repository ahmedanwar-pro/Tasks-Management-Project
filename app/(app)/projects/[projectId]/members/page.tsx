import { ProjectMembersListScreen } from '@/features/members/screens/project-members-list-screen';

type ProjectMembersPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectMembersPage({
  params,
}: ProjectMembersPageProps) {
  const { projectId } = await params;

  return <ProjectMembersListScreen projectId={projectId} />;
}
