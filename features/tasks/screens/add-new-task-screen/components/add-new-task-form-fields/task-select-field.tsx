import type { FocusEventHandler, ReactElement, ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { FormField } from '@/components/forms';
import { Spinner } from '@/components/ui';
import { SelectChevron } from '../add-new-task-form-icons';

type TaskSelectFieldProps = {
  children: ReactNode;
  disabled?: boolean;
  error?: string;
  isLoading?: boolean;
  label: string;
  onFocus?: FocusEventHandler<HTMLSelectElement>;
  registration: UseFormRegisterReturn;
  required?: boolean;
  selectClassName?: string;
};

const selectBaseClasses =
  'bg-primary-container-muted text-text-primary focus-visible:outline-primary h-(--control-height-xl) w-full appearance-none rounded-sm border border-transparent px-4 pr-10 leading-relaxed outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

export function TaskSelectField({
  children,
  disabled = false,
  error,
  isLoading = false,
  label,
  onFocus,
  registration,
  required = false,
  selectClassName = 'text-body-md',
}: TaskSelectFieldProps): ReactElement {
  return (
    <FormField
      className="gap-2"
      error={error}
      label={label}
      labelClassName="text-[11px] leading-[16.5px] tracking-[0.55px] lg:text-text-secondary"
      required={required}
      size="lg"
    >
      {({ inputId, descriptionId }) => (
        <div className="relative w-full">
          <select
            {...registration}
            aria-describedby={descriptionId}
            aria-invalid={Boolean(error) || undefined}
            className={`${selectBaseClasses} ${selectClassName}`}
            disabled={disabled}
            id={inputId}
            onFocus={onFocus}
          >
            {children}
          </select>
          {isLoading ? (
            <span className="text-text-tertiary pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
              <Spinner size="sm" />
            </span>
          ) : (
            <SelectChevron />
          )}
        </div>
      )}
    </FormField>
  );
}
