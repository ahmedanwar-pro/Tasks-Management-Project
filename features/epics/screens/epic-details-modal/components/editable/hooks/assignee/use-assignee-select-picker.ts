'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';

type UseAssigneeSelectPickerParams = {
  hasError: boolean;
  isEditing: boolean;
  isLoading: boolean;
  selectRef: RefObject<HTMLSelectElement | null>;
};

export function useAssigneeSelectPicker({
  hasError,
  isEditing,
  isLoading,
  selectRef,
}: UseAssigneeSelectPickerParams): void {
  useEffect(() => {
    if (!isEditing || isLoading || hasError) {
      return;
    }

    const select = selectRef.current as
      | (HTMLSelectElement & { showPicker?: () => void })
      | null;

    select?.focus();
    select?.showPicker?.();
  }, [hasError, isEditing, isLoading, selectRef]);
}
