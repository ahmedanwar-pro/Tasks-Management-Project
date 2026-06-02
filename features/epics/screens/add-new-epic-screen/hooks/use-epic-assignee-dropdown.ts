import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import type { AssigneeOption } from '../utils';
import { mapAssigneeOption } from '../utils';
import { useAddNewEpicMembersQuery } from './use-add-new-epic-members-query';

type UseEpicAssigneeDropdownParams = {
  projectId: string;
  registerSelectRef: (element: HTMLSelectElement | null) => void;
};

type UseEpicAssigneeDropdownResult = {
  members: AssigneeOption[];
  isDisabled: boolean;
  isMembersLoading: boolean;
  hasError: boolean;
  placeholder: string;
  setSelectRef: (element: HTMLSelectElement | null) => void;
  handleLoadMembers: () => void;
  handlePointerDown: (event: PointerEvent<HTMLSelectElement>) => void;
};

export function useEpicAssigneeDropdown({
  projectId,
  registerSelectRef,
}: UseEpicAssigneeDropdownParams): UseEpicAssigneeDropdownResult {
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const shouldOpenAfterLoadRef = useRef(false);
  const [shouldLoadMembers, setShouldLoadMembers] = useState(false);
  const {
    data,
    error,
    isPending: isMembersPending,
    refetch: refetchMembers,
  } = useAddNewEpicMembersQuery(projectId, shouldLoadMembers);
  const members = (data?.members ?? []).map(mapAssigneeOption);
  const isMembersLoading = shouldLoadMembers && isMembersPending;
  const hasError = Boolean(error);
  const hasNoMembers =
    shouldLoadMembers && !isMembersLoading && members.length === 0 && !hasError;
  const isDisabled = hasNoMembers;
  const placeholder = isMembersLoading
    ? 'Loading members...'
    : hasNoMembers
      ? 'No members available'
      : 'Select a member...';

  useEffect(() => {
    if (
      !shouldOpenAfterLoadRef.current ||
      isMembersLoading ||
      hasError ||
      members.length === 0
    ) {
      return;
    }

    const select = selectRef.current as
      | (HTMLSelectElement & { showPicker?: () => void })
      | null;

    select?.focus();
    select?.showPicker?.();
    shouldOpenAfterLoadRef.current = false;
  }, [hasError, isMembersLoading, members.length]);

  function setSelectRef(element: HTMLSelectElement | null): void {
    selectRef.current = element;
    registerSelectRef(element);
  }

  function handleLoadMembers(): void {
    if (!shouldLoadMembers) {
      setShouldLoadMembers(true);
      return;
    }

    if (hasError) {
      void refetchMembers();
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLSelectElement>): void {
    if (!shouldLoadMembers) {
      event.preventDefault();
      shouldOpenAfterLoadRef.current = true;
    }

    if (hasError) {
      event.preventDefault();
    }

    handleLoadMembers();
  }

  return {
    members,
    isDisabled,
    isMembersLoading,
    hasError,
    placeholder,
    setSelectRef,
    handleLoadMembers,
    handlePointerDown,
  };
}
