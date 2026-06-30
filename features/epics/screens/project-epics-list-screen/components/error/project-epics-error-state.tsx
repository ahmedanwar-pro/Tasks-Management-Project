import type { ReactElement } from 'react';
import { ProjectsErrorState } from '@/features/projects/screens/projects-list-screen/components';

type ProjectEpicsErrorStateProps = {
  isRetrying: boolean;
  onRetry: () => void;
  title: string;
};

export function ProjectEpicsErrorState({
  isRetrying,
  onRetry,
  title,
}: ProjectEpicsErrorStateProps): ReactElement {
  return (
    <ProjectsErrorState
      compact
      description="We're having trouble retrieving your project epics right now. Please try again in a moment."
      isRetrying={isRetrying}
      onRetry={onRetry}
      title={title}
      titleAs="h2"
    />
  );
}
