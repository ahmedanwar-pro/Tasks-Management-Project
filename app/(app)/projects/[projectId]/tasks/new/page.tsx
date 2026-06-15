import { AddNewTaskScreen } from '@/features/tasks/screens';

type NewTaskPageProps = {
  params: Promise<{
    projectId: string;
  }>;
  searchParams: Promise<{
    epicId?: string | string[];
  }>;
};

export default async function NewTaskPage({
  params,
  searchParams,
}: NewTaskPageProps) {
  const { projectId } = await params;
  const { epicId } = await searchParams;
  const initialEpicId = Array.isArray(epicId) ? epicId[0] : epicId;

  return (
    <AddNewTaskScreen initialEpicId={initialEpicId} projectId={projectId} />
  );
}
