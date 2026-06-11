import type { ReactElement } from 'react';
import { Spinner } from '@/components/ui';
import { joinClasses } from '@/components/ui/utils';

type EditableFieldLoadingIndicatorProps = {
  className?: string;
  label: string;
};

export function EditableFieldLoadingIndicator({
  className,
  label,
}: EditableFieldLoadingIndicatorProps): ReactElement {
  return (
    <span
      aria-live="polite"
      className={joinClasses(
        'inline-flex shrink-0 items-center justify-center text-text-tertiary',
        className,
      )}
      role="status"
    >
      <Spinner size="sm" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
