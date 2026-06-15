import type { ReactElement } from 'react';
import { EpicFormFeedback } from '@/features/epics/screens/shared/components';

type AddNewTaskFormFeedbackProps = {
  error?: Error | null;
  success?: boolean;
};

export function AddNewTaskFormFeedback({
  error,
  success = false,
}: AddNewTaskFormFeedbackProps): ReactElement | null {
  if (error) {
    return (
      <EpicFormFeedback error={`Failed to create task: ${error.message}`} />
    );
  }

  if (success) {
    return <EpicFormFeedback success="Task created successfully" />;
  }

  return null;
}
