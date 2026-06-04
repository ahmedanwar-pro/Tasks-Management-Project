import type { ReactElement } from 'react';
import { ProjectsErrorState } from '@/features/projects/screens/projects-list-screen/components';

type ProjectEpicsErrorStateProps = {
  onRetry: () => void;
};

export function ProjectEpicsErrorState({
  onRetry,
}: ProjectEpicsErrorStateProps): ReactElement {
  return (
    <ProjectsErrorState
      description="We're having trouble retrieving your project epics right now. Please try again in a moment."
      onRetry={onRetry}
      title="Something went wrong"
    />
  );
}
