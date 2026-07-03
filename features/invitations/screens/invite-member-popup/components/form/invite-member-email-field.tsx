import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { FormField } from '@/components/forms';
import { Input } from '@/components/ui';
import { MailIcon } from '../invite-member-icons';

type InviteMemberEmailFieldProps = {
  error?: string;
  registration: UseFormRegisterReturn<'email'>;
};

export function InviteMemberEmailField({
  error,
  registration,
}: InviteMemberEmailFieldProps): ReactElement {
  return (
    <FormField
      controlClassName="gap-2"
      error={error}
      inputId="invite-member-email"
      label="Email Address"
      labelClassName={
        error
          ? 'ml-1 text-[11px] leading-[16.5px] tracking-[0.55px] !text-danger md:ml-0 md:tracking-[1.1px]'
          : 'ml-1 text-[11px] leading-[16.5px] tracking-[0.55px] text-text-secondary md:ml-0 md:tracking-[1.1px]'
      }
      messageClassName="ml-1 text-[11px] leading-[16.5px] md:ml-0"
    >
      {({ descriptionId, inputId }) => (
        <Input
          aria-describedby={descriptionId}
          autoComplete="email"
          className="h-[54px] gap-[17px] rounded-md md:h-12 md:gap-3 md:rounded-xs [&>span:first-child]:!h-[54px] [&>span:first-child]:!w-[15px] md:[&>span:first-child]:hidden [&>span:first-child>svg]:!h-3 [&>span:first-child>svg]:!w-[15px] [&>span:last-child]:hidden md:[&>span:last-child]:inline-flex md:[&>span:last-child]:!h-12 md:[&>span:last-child]:!w-[15px] md:[&>span:last-child>svg]:!h-3 md:[&>span:last-child>svg]:!w-[15px]"
          fullWidth
          iconLeft={<MailIcon />}
          iconRight={<MailIcon />}
          id={inputId}
          inputClassName="leading-[19px] placeholder:text-text-muted/60"
          invalid={Boolean(error)}
          placeholder="Enter email address"
          type="email"
          {...registration}
        />
      )}
    </FormField>
  );
}
