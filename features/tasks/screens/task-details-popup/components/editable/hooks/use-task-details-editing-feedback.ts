'use client';

import { useCallback, useState } from 'react';

const taskUpdateErrorMessage = 'Failed to update task. Please try again.';
const taskUpdateSuccessMessage = 'Task updated successfully';

export function useTaskDetailsEditingFeedback() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const clearFeedback = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const reportInvalid = useCallback(() => {
    setError(taskUpdateErrorMessage);
  }, []);

  const reportSaveError = useCallback(() => {
    setError(taskUpdateErrorMessage);
  }, []);

  const reportSaveSuccess = useCallback(() => {
    setSuccess(taskUpdateSuccessMessage);
  }, []);

  return {
    clearFeedback,
    error,
    reportInvalid,
    reportSaveError,
    reportSaveSuccess,
    success,
  };
}
