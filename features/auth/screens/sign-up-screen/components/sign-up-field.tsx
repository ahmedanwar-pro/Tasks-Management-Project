import type { ReactElement, ReactNode } from 'react';
import type {
  ChangeEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
  Ref,
} from 'react';
import { FormField } from '@/components/forms';
import { Input } from '@/components/ui';

type SignUpFieldProps = {
  label: ReactNode;
  name: string;
  placeholder: string;
  type?: 'email' | 'password' | 'text';
  autoComplete?: string;
  error?: ReactNode;
  hint?: ReactNode;
  iconRight?: ReactNode;
  iconRightAriaHidden?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  ref?: Ref<HTMLInputElement>;
  value?: string;
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'required'>;

export function SignUpField({
  label,
  name,
  placeholder,
  type = 'text',
  autoComplete,
  error,
  hint,
  iconRight,
  iconRightAriaHidden,
  onBlur,
  onChange,
  ref,
  required,
  value,
}: SignUpFieldProps): ReactElement {
  const hasError = Boolean(error);

  return (
    <FormField
      className="gap-[5.5px]"
      error={error}
      hint={hint}
      label={label}
      required={required}
      labelClassName={
        hasError
          ? 'px-1 text-[11px] leading-[16.5px] tracking-[0.55px] !text-danger'
          : 'px-1 text-[11px] leading-[16.5px] tracking-[0.55px] text-text-secondary md:text-text-tertiary'
      }
      messageClassName={
        hasError
          ? 'px-1 text-[11px] leading-[16.5px] md:text-[11px] md:leading-[16.5px]'
          : 'hidden px-1 text-[11px] leading-[16.5px] text-border-muted md:block'
      }
    >
      {({ inputId, descriptionId }) => (
        <Input
          aria-describedby={descriptionId}
          autoComplete={autoComplete}
          className="bg-primary-container-muted text-body-md h-(--control-height-2xl) rounded-md px-4 leading-relaxed md:h-(--control-height-xl) md:rounded-sm"
          fullWidth
          iconRight={iconRight}
          iconRightAriaHidden={iconRightAriaHidden}
          id={inputId}
          inputClassName={
            hasError
              ? 'text-danger-text placeholder:text-danger-text'
              : 'placeholder:text-text-muted'
          }
          invalid={hasError}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          radius="md"
          required={required}
          ref={ref}
          size="lg"
          type={type}
          value={value}
          variant="filled"
        />
      )}
    </FormField>
  );
}
