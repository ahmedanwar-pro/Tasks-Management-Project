import { useId } from 'react';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { joinClasses } from '../../ui/utils';

type FormFieldLayout = 'stacked' | 'split';
type FormFieldSize = 'md' | 'lg';

type FormFieldRenderProps = {
  inputId: string;
  descriptionId: string | undefined;
  errorId: string | undefined;
  hintId: string | undefined;
  counterId: string | undefined;
};

type FormFieldChildren = (props: FormFieldRenderProps) => ReactNode;

type FormFieldProps = {
  label: ReactNode;
  children: FormFieldChildren;
  counter?: ReactNode;
  error?: ReactNode;
  fullWidth?: boolean;
  hint?: ReactNode;
  inputId?: string;
  layout?: FormFieldLayout;
  optional?: boolean;
  required?: boolean;
  size?: FormFieldSize;
  controlClassName?: string;
  labelClassName?: string;
  messageClassName?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

const rootBaseClasses = 'font-sans';

const layoutClasses: Record<FormFieldLayout, string> = {
  stacked: 'flex flex-col items-start gap-2',
  split: 'grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-x-6 md:gap-y-2',
};

const labelWrapClasses: Record<FormFieldLayout, string> = {
  stacked: 'flex w-full items-start justify-between gap-2',
  split: 'flex w-full items-start justify-between gap-2 md:pt-2',
};

const controlWrapClasses: Record<FormFieldLayout, string> = {
  stacked: 'flex w-full flex-col items-start gap-2',
  split: 'flex w-full flex-col items-start gap-2 md:col-span-3',
};

const labelSizeClasses: Record<FormFieldSize, string> = {
  md: 'text-label-sm leading-tight tracking-[0.55px]',
  lg: 'text-label-sm leading-tight tracking-label',
};

const labelClasses =
  'font-bold uppercase text-text-secondary';

const optionalClasses =
  'text-label-sm font-normal lowercase leading-compact tracking-normal text-text-muted';

const hintClasses =
  'px-1 text-label-sm font-normal leading-compact tracking-normal text-border-muted';

const counterClasses =
  'ml-auto text-label-sm font-medium leading-compact tracking-normal text-text-tertiary';

const errorClasses =
  'flex items-center gap-2 text-label-md font-medium leading-tight tracking-normal text-danger';

function ErrorIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="size-[13.333px] shrink-0"
      fill="none"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7" cy="7" r="5.75" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 3.75v3.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <circle cx="7" cy="10" fill="currentColor" r="0.75" />
    </svg>
  );
}

export function FormField({
  label,
  children,
  className,
  controlClassName,
  counter,
  error,
  fullWidth = true,
  hint,
  id,
  inputId,
  labelClassName,
  layout = 'stacked',
  messageClassName,
  optional = false,
  required = false,
  size = 'md',
  ...props
}: FormFieldProps): ReactElement {
  const generatedId = useId();
  const rootId = id ?? generatedId;
  const controlId = inputId ?? `${rootId}-control`;
  const errorId = error ? `${rootId}-error` : undefined;
  const hintId = !error && hint ? `${rootId}-hint` : undefined;
  const counterId = !error && counter ? `${rootId}-counter` : undefined;
  const descriptionId = [errorId, hintId, counterId].filter(Boolean).join(' ') || undefined;
  const renderedChildren = children({
    inputId: controlId,
    descriptionId,
    errorId,
    hintId,
    counterId,
  });

  return (
    <div
      {...props}
      className={joinClasses(
        rootBaseClasses,
        layoutClasses[layout],
        fullWidth ? 'w-full' : 'w-auto',
        className,
      )}
      id={rootId}
    >
      <div className={labelWrapClasses[layout]}>
        <label
          className={joinClasses(labelClasses, labelSizeClasses[size], labelClassName)}
          htmlFor={controlId}
        >
          {label}
          {required ? <span className="text-danger"> *</span> : null}
          {optional ? <span className={optionalClasses}> (Optional)</span> : null}
        </label>
      </div>

      <div className={joinClasses(controlWrapClasses[layout], controlClassName)}>
        {renderedChildren}

        {error ? (
          <p className={joinClasses(errorClasses, messageClassName)} id={errorId} role="alert">
            <ErrorIcon />
            <span>{error}</span>
          </p>
        ) : null}

        {!error && hint ? (
          <p className={joinClasses(hintClasses, messageClassName)} id={hintId}>
            {hint}
          </p>
        ) : null}

        {!error && counter ? (
          <p className={counterClasses} id={counterId}>
            {counter}
          </p>
        ) : null}
      </div>
    </div>
  );
}
