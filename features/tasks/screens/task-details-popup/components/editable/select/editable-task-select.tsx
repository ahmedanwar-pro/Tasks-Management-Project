'use client';

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { EditableTaskSelectEditor } from './editable-task-select-editor';
import {
  getEditableTaskSelectErrorMessage,
  getEditableTaskSelectNextLabel,
} from './editable-task-select.utils';
import { EditableTaskSelectView } from './editable-task-select-view';

export type EditableTaskSelectOption = {
  label: string;
  value: string;
};

type EditableTaskSelectProps = {
  allowClear?: boolean;
  ariaLabel: string;
  className?: string;
  currentLabel: string;
  currentValue: string | null;
  error?: string | null;
  isLoading?: boolean;
  isSaving: boolean;
  hoverClassName?: string;
  leadingIcon?: ReactNode;
  onRetry?: () => void;
  onStartEditing?: () => void;
  onSave: (value: string | null) => Promise<void>;
  options: EditableTaskSelectOption[];
  viewContent?: ReactNode;
};

const blockedPickerErrorNames = new Set([
  'NotAllowedError',
  'NotSupportedError',
  'SecurityError',
]);

function focusAndOpenPicker(select: HTMLSelectElement) {
  select.focus();

  if (
    typeof select.showPicker !== 'function' ||
    navigator.userActivation?.isActive === false
  ) {
    return;
  }

  try {
    select.showPicker();
  } catch (error) {
    if (
      error instanceof DOMException &&
      blockedPickerErrorNames.has(error.name)
    ) {
      return;
    }

    throw error;
  }
}

export function EditableTaskSelect({
  allowClear = false,
  ariaLabel,
  className,
  currentLabel,
  currentValue,
  error,
  isLoading = false,
  isSaving,
  hoverClassName,
  leadingIcon,
  onRetry,
  onStartEditing,
  onSave,
  options,
  viewContent,
}: EditableTaskSelectProps): ReactElement {
  const feedbackId = useId();
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const shouldOpenPickerRef = useRef(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(currentValue ?? '');
  const [optimisticSelection, setOptimisticSelection] = useState<{
    baseLabel: string;
    label: string;
    value: string | null;
  } | null>(null);
  const optimisticLabel =
    optimisticSelection &&
    (optimisticSelection.baseLabel === currentLabel ||
      optimisticSelection.value === currentValue)
      ? optimisticSelection.label
      : null;
  const errorMessage = getEditableTaskSelectErrorMessage(ariaLabel);

  useLayoutEffect(() => {
    if (
      !isEditing ||
      isLoading ||
      Boolean(error) ||
      !shouldOpenPickerRef.current
    ) {
      return;
    }

    const select = selectRef.current;

    if (select) {
      focusAndOpenPicker(select);
    }

    shouldOpenPickerRef.current = false;
  }, [error, isEditing, isLoading]);

  function startEditing() {
    if (isSaving) return;
    onStartEditing?.();
    shouldOpenPickerRef.current = true;
    setDraft(currentValue ?? '');
    setIsEditing(true);
  }

  async function change(nextValue: string) {
    const normalizedValue = nextValue || null;
    const nextLabel = getEditableTaskSelectNextLabel({
      ariaLabel,
      currentLabel,
      nextValue,
      options,
    });
    setDraft(nextValue);
    setOptimisticSelection({
      baseLabel: currentLabel,
      label: nextLabel,
      value: normalizedValue,
    });
    setIsEditing(false);
    if (normalizedValue === currentValue) return;

    try {
      await onSave(normalizedValue);
    } catch {
      setDraft(currentValue ?? '');
      setOptimisticSelection(null);
    }
  }

  if (isEditing) {
    return (
      <EditableTaskSelectEditor
        allowClear={allowClear}
        ariaLabel={ariaLabel}
        draft={draft}
        error={error}
        errorMessage={errorMessage}
        feedbackId={feedbackId}
        isLoading={isLoading}
        isSaving={isSaving}
        onCancel={() => setIsEditing(false)}
        onChange={(nextValue) => void change(nextValue)}
        onRetry={onRetry}
        options={options}
        selectRef={selectRef}
      />
    );
  }

  return (
    <EditableTaskSelectView
      ariaLabel={ariaLabel}
      className={className}
      currentLabel={currentLabel}
      hoverClassName={hoverClassName}
      isSaving={isSaving}
      leadingIcon={leadingIcon}
      onStartEditing={startEditing}
      optimisticLabel={optimisticLabel}
      viewContent={viewContent}
    />
  );
}
