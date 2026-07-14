'use client';

import { useCallback, useEffect, useState } from 'react';

const taskUpdateErrorMessage = 'Failed to update task. Please try again.';
const taskUpdateSuccessMessage = 'Task updated successfully';
const taskUpdateSuccessToastDurationMs = 4000;
const taskUpdateSuccessToastCollapseDurationMs = 450;

export function useTaskDetailsEditingFeedback() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const clearFeedback = useCallback(() => {
    setError(null);
    setSuccess(null);
    setIsSuccessVisible(false);
  }, []);

  const closeSuccess = useCallback(() => {
    setIsSuccessVisible(false);
  }, []);

  const reportInvalid = useCallback(() => {
    setError(taskUpdateErrorMessage);
  }, []);

  const reportSaveError = useCallback(() => {
    setError(taskUpdateErrorMessage);
  }, []);

  const reportSaveSuccess = useCallback(() => {
    setSuccess(taskUpdateSuccessMessage);
    setIsSuccessVisible(true);
  }, []);

  useEffect(() => {
    if (!isSuccessVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsSuccessVisible(false);
    }, taskUpdateSuccessToastDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSuccessVisible]);

  useEffect(() => {
    if (isSuccessVisible || !success) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSuccess(null);
    }, taskUpdateSuccessToastCollapseDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSuccessVisible, success]);

  return {
    clearFeedback,
    closeSuccess,
    error,
    isSuccessVisible,
    reportInvalid,
    reportSaveError,
    reportSaveSuccess,
    success,
  };
}
