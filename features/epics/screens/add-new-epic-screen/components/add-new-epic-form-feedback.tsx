import type { ReactElement } from 'react';
import { EpicFormFeedback } from '../../shared/components';

type AddNewEpicFormFeedbackProps = {
  error?: Error | null;
  success: boolean;
};

export function AddNewEpicFormFeedback({
  error,
  success,
}: AddNewEpicFormFeedbackProps): ReactElement | null {
  if (error) {
    return <EpicFormFeedback error={`Failed to create epic: ${error.message}`} />;
  }

  if (success) {
    return <EpicFormFeedback success="Epic created successfully" />;
  }

  return null;
}
