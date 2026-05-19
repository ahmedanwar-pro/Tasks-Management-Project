import { useId } from 'react';
import type {
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactElement,
  Ref,
} from 'react';
import { joinClasses } from '../../ui/utils';

type DateFieldSize = 'md' | 'lg';

type DateFieldProps = {
  label: string;
  error?: string;
  hint?: string;
  size?: DateFieldSize;
  fullWidth?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  ref?: Ref<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'onChange' | 'size' | 'type'
>;

const rootBaseClasses = 'inline-flex flex-col items-start gap-2 font-sans';

const labelClasses =
  'text-label-sm font-bold uppercase leading-tight tracking-[0.55px] text-text-primary';

const inputWrapperBaseClasses =
  'relative inline-flex h-[var(--control-height-xl)] shrink-0 items-center overflow-hidden rounded-sm border border-transparent bg-primary-container-muted px-4 text-text-primary tracking-normal transition-colors duration-150 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary has-disabled:cursor-not-allowed has-disabled:opacity-60';

const inputSizeClasses: Record<DateFieldSize, string> = {
  md: 'text-body-sm leading-relaxed',
  lg: 'text-body-md leading-relaxed',
};

const inputBaseClasses =
  'min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 pr-8 font-sans text-inherit outline-none placeholder:text-text-muted disabled:cursor-not-allowed [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-y-0 [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0';

const iconClasses =
  'pointer-events-none absolute right-4 top-1/2 size-icon-md -translate-y-1/2 text-text-tertiary';

const helperTextClasses = 'text-label-sm leading-compact text-text-muted';

const errorTextClasses =
  'text-label-sm font-medium uppercase leading-tight tracking-[0.55px] text-danger';

function CalendarIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-full"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.25 2.5v2.25M13.75 2.5v2.25M3.5 7.25h13M4.25 4.25h11.5c.69 0 1.25.56 1.25 1.25v10.25c0 .69-.56 1.25-1.25 1.25H4.25C3.56 17 3 16.44 3 15.75V5.5c0-.69.56-1.25 1.25-1.25Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function DateField({
  label,
  error,
  hint,
  size = 'md',
  fullWidth = true,
  className,
  labelClassName,
  inputClassName,
  id,
  ref,
  ...props
}: DateFieldProps): ReactElement {
  const generatedId = useId();
  const generatedDescriptionId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = error || hint ? generatedDescriptionId : undefined;
  const invalid = Boolean(error) || Boolean(props['aria-invalid']);

  return (
    <div
      className={joinClasses(
        rootBaseClasses,
        fullWidth ? 'w-full' : 'w-auto',
        className,
      )}
    >
      <label
        className={joinClasses(labelClasses, error && 'text-danger', labelClassName)}
        htmlFor={inputId}
      >
        {label}
      </label>
      <span
        className={joinClasses(
          inputWrapperBaseClasses,
          inputSizeClasses[size],
          fullWidth ? 'w-full' : 'w-auto',
        )}
      >
        <input
          {...props}
          aria-describedby={descriptionId}
          aria-invalid={invalid || undefined}
          className={joinClasses(inputBaseClasses, inputClassName)}
          id={inputId}
          ref={ref}
          type="date"
        />
        <span className={iconClasses}>
          <CalendarIcon />
        </span>
      </span>
      {error ? (
        <p className={errorTextClasses} id={descriptionId} role="alert">
          {error}
        </p>
      ) : null}
      {!error && hint ? (
        <p className={helperTextClasses} id={descriptionId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
