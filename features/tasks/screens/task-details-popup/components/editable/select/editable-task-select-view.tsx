import type { ReactElement, ReactNode } from 'react';
import { EditableFieldLoadingIndicator } from '@/features/epics/screens/epic-details-modal/components/editable/editable-field-loading-indicator';
import { TaskDetailsChevronDownIcon } from '../../shared/task-details-icons';

type EditableTaskSelectViewProps = {
  ariaLabel: string;
  className?: string;
  currentLabel: string;
  hoverClassName?: string;
  isSaving: boolean;
  leadingIcon?: ReactNode;
  onStartEditing: () => void;
  optimisticLabel: string | null;
  viewContent?: ReactNode;
};

export function EditableTaskSelectView({
  ariaLabel,
  className,
  currentLabel,
  hoverClassName,
  isSaving,
  leadingIcon,
  onStartEditing,
  optimisticLabel,
  viewContent,
}: EditableTaskSelectViewProps): ReactElement {
  return (
    <button
      aria-label={`${ariaLabel}: ${optimisticLabel ?? currentLabel}`}
      className={`${className ?? ''} ${hoverClassName ?? ''} focus-visible:outline-primary flex min-w-0 items-center justify-between gap-2 rounded-sm text-left transition-[background-color,color,filter] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${isSaving ? 'cursor-wait opacity-60' : ''}`}
      disabled={isSaving}
      onClick={onStartEditing}
      type="button"
    >
      <span className="flex min-w-0 items-center gap-1.5">
        {viewContent &&
        (!optimisticLabel || optimisticLabel === currentLabel) ? (
          viewContent
        ) : (
          <>
            {leadingIcon}
            <span className="truncate">{optimisticLabel ?? currentLabel}</span>
          </>
        )}
      </span>
      {isSaving ? (
        <EditableFieldLoadingIndicator label="Saving..." />
      ) : (
        <TaskDetailsChevronDownIcon />
      )}
    </button>
  );
}
