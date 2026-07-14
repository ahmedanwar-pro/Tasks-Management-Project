import type { ReactElement } from 'react';
import { EpicFormFeedback } from '@/features/epics/screens/shared/components';

type AddNewTaskFormFeedbackProps = {
  error?: Error | null;
};

export function AddNewTaskFormFeedback({
  error,
}: AddNewTaskFormFeedbackProps): ReactElement | null {
  if (error) {
    return (
      <EpicFormFeedback error={`Failed to create task: ${error.message}`} />
    );
  }

  return null;
}
