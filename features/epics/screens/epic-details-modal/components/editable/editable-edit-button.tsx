import type { ReactElement } from 'react';
import { joinClasses } from '@/components/ui/utils';
import { EditIcon } from '@/features/projects/screens/projects-list-screen/components/icons/projects-list-icons';

type EditableEditButtonProps = {
  'aria-label': string;
  className?: string;
  disabled: boolean;
  onClick: () => void;
};

export function EditableEditButton({
  'aria-label': ariaLabel,
  className,
  disabled,
  onClick,
}: EditableEditButtonProps): ReactElement {
  return (
    <button
      aria-label={ariaLabel}
      className={joinClasses(
        'text-text-subtle hover:text-text-secondary focus-visible:outline-primary flex h-5 w-4 shrink-0 items-center justify-end focus-visible:outline disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <EditIcon />
    </button>
  );
}
