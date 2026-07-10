import type { ReactElement, RefObject } from 'react';
import { EditableFieldLoadingIndicator } from '@/features/epics/screens/epic-details-modal/components/editable/editable-field-loading-indicator';

type EditableTaskDescriptionViewProps = {
  description: string;
  fieldButtonRef?: RefObject<HTMLButtonElement | null>;
  fieldLayoutClassName: string;
  fieldPaddingClassName: string;
  isSaving: boolean;
  onStartEditing: () => void;
  variant: 'desktop' | 'tablet' | 'mobile';
  viewFieldRef: RefObject<HTMLDivElement | null>;
};

export function EditableTaskDescriptionView({
  description,
  fieldButtonRef,
  fieldLayoutClassName,
  fieldPaddingClassName,
  isSaving,
  onStartEditing,
  variant,
  viewFieldRef,
}: EditableTaskDescriptionViewProps): ReactElement {
  return (
    <div className={fieldLayoutClassName} ref={viewFieldRef}>
      <button
        ref={fieldButtonRef}
        className={`enabled:hover:bg-primary-container-muted/35 focus-visible:outline-primary min-w-0 flex-1 rounded-sm text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${
          variant === 'desktop'
            ? 'text-body-sm text-text-primary leading-[22.75px]'
            : 'text-body-sm leading-[22.75px]'
        } ${fieldPaddingClassName} ${isSaving ? 'cursor-wait opacity-60' : ''}`}
        disabled={isSaving}
        onClick={onStartEditing}
        type="button"
      >
        <span className="block min-w-0">{description}</span>
      </button>
      {isSaving ? <EditableFieldLoadingIndicator label="Saving..." /> : null}
    </div>
  );
}
