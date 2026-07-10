import type { ReactElement, RefObject } from 'react';
import { Textarea } from '@/components/ui';

type EditableTaskDescriptionEditorProps = {
  descriptionValue: string;
  draft: string;
  editFieldLayoutClassName: string;
  editFieldRef: RefObject<HTMLDivElement | null>;
  isSaving: boolean;
  onCancel: () => void;
  onChange: (value: string) => void;
  onSave: () => void;
  textareaLayoutClassName: string;
};

export function EditableTaskDescriptionEditor({
  descriptionValue,
  draft,
  editFieldLayoutClassName,
  editFieldRef,
  isSaving,
  onCancel,
  onChange,
  onSave,
  textareaLayoutClassName,
}: EditableTaskDescriptionEditorProps): ReactElement {
  return (
    <div className={editFieldLayoutClassName} ref={editFieldRef}>
      <Textarea
        aria-label="Task description"
        autoFocus
        className={`!border-primary !bg-primary-container-muted/60 ${textareaLayoutClassName} rounded-sm border-2 focus:ring-0 focus:outline-none`}
        disabled={isSaving}
        onBlur={onSave}
        onChange={(event) => onChange(event.target.value)}
        onKeyDownCapture={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            onChange(descriptionValue);
            onCancel();
          }
        }}
        placeholder="Describe this task..."
        size="sm"
        value={draft}
      />
    </div>
  );
}
