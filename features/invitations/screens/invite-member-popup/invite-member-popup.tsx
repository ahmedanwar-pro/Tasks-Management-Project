'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import type { ReactElement, SVGProps } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '@/components/forms';
import { Button, Input, Modal } from '@/components/ui';
import { inviteMemberSchema } from './utils';
import type { InviteMemberFormValues } from './utils';

type InviteMemberPopupProps = {
  projectId: string;
};

export function InviteMemberPopup({
  projectId,
}: InviteMemberPopupProps): ReactElement {
  const router = useRouter();
  const membersHref = `/projects/${projectId}/members`;
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<InviteMemberFormValues>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(inviteMemberSchema),
  });

  const emailError = errors.email?.message;

  function closePopup(): void {
    router.replace(membersHref);
  }

  function handleInviteMemberSubmit(): void {}

  return (
    <Modal
      aria-describedby="invite-member-description"
      aria-labelledby="invite-member-title"
      bodyClassName="!p-0"
      className="h-[460px] shadow-[0px_-4px_12px_rgba(4,27,60,0.06)] md:h-[385px] md:shadow-[0px_24px_48px_-12px_rgba(4,27,60,0.12)]"
      initialFocus="container"
      onClose={closePopup}
      open
      overlayClassName="backdrop-blur-[2px] bg-text-primary/40 md:backdrop-blur-[6px]"
      placement="responsive"
      size="responsive-sm"
    >
      <div className="relative h-full px-8 pt-[70px] md:p-8">
        <span
          aria-hidden="true"
          className="bg-border-muted/30 absolute top-8 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-lg md:hidden"
        />

        <div className="flex items-start justify-between">
          <div>
            <div className="text-primary mb-1 text-[11px] leading-[16.5px] font-bold tracking-[0.55px] uppercase md:hidden">
              Project Name
            </div>
            <div className="bg-surface-low text-primary mb-3 hidden size-12 items-center justify-center rounded-md md:mb-2 md:flex">
              <InvitePersonIcon className="h-4 w-[22px]" />
            </div>
            <h2
              className="text-headline-md leading-section tracking-heading text-text-primary font-bold"
              id="invite-member-title"
            >
              Invite Team Member
            </h2>
          </div>

          <button
            aria-label="Close invite member dialog"
            className="focus-visible:outline-primary text-text-secondary hover:bg-surface-low -mt-[5px] -mr-[5px] flex size-10 items-center justify-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:mt-0.5 md:-mr-[15px] md:size-11"
            onClick={closePopup}
            type="button"
          >
            <CloseIcon className="size-3.5" />
          </button>
        </div>

        <p
          className="text-body-sm leading-base text-text-tertiary flex h-[53px] max-w-[324px] items-center md:mt-2 md:h-auto md:max-w-none"
          id="invite-member-description"
        >
          Send an invitation to join the Architectural Studio workspace.
        </p>

        <form
          aria-labelledby="invite-member-title"
          className="mt-[27px] md:mt-6"
          noValidate
          onSubmit={handleSubmit(handleInviteMemberSubmit)}
        >
          <FormField
            controlClassName="gap-2"
            error={emailError}
            inputId="invite-member-email"
            label="Email Address"
            labelClassName={
              emailError
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
                invalid={Boolean(emailError)}
                placeholder="Enter email address"
                type="email"
                {...register('email')}
              />
            )}
          </FormField>

          <div className="mt-[38px] flex flex-col gap-3 md:mt-10 md:flex-row md:justify-end md:gap-3">
            <Button
              className="text-text-secondary md:text-text-tertiary order-1 h-11 rounded-md font-medium md:order-none md:h-12 md:w-[186px] md:rounded-xs md:font-semibold"
              onClick={closePopup}
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              className="h-[52px] rounded-md bg-[linear-gradient(137.12deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[linear-gradient(137.12deg,var(--color-primary-container)_0%,var(--color-primary)_100%)] md:h-12 md:w-[186px] md:rounded-xs md:bg-[linear-gradient(165.53deg,var(--color-primary)_0%,var(--color-primary-container)_100%)] md:shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] md:hover:bg-[linear-gradient(165.53deg,var(--color-primary-container)_0%,var(--color-primary)_100%)]"
              type="submit"
            >
              Send Invitation
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

function InvitePersonIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.14 0-7.5 2.01-7.5 4.5V20h12.1a5.98 5.98 0 0 1-.1-1c0-2.05 1.03-3.86 2.6-4.94A14.2 14.2 0 0 0 9.5 13Z"
        fill="currentColor"
      />
      <path
        d="M19 15v3m0 0v3m0-3h3m-3 0h-3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function MailIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" {...props}>
      <path
        d="m3 5 7 5 7-5M3 5h14v10H3V5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function CloseIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" {...props}>
      <path
        d="m4 4 12 12M16 4 4 16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
