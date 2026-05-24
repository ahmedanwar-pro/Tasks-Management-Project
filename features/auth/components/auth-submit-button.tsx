import type { ReactElement } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from '@/components/ui';

type AuthSubmitButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: ReactNode;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>;

export function AuthSubmitButton({
  children,
  disabled,
  isLoading,
  loadingText,
}: AuthSubmitButtonProps): ReactElement {
  return (
    <Button
      className="text-body-md h-(--control-height-2xl) rounded-md leading-relaxed md:h-(--control-height-xl) md:rounded-sm"
      disabled={disabled}
      fullWidth
      isLoading={isLoading}
      loadingText={loadingText}
      size="lg"
      type="submit"
    >
      {children}
    </Button>
  );
}
