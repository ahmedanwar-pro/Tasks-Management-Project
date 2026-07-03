import type { ReactElement } from 'react';
import { CloseIcon, InvitePersonIcon } from './invite-member-icons';

type InviteMemberHeaderProps = {
  onClose: () => void;
  projectName: string;
};

export function InviteMemberHeader({
  onClose,
  projectName,
}: InviteMemberHeaderProps): ReactElement {
  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-primary mb-1 text-[11px] leading-[16.5px] font-bold tracking-[0.55px] uppercase md:hidden">
            {projectName}
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
          onClick={onClose}
          type="button"
        >
          <CloseIcon className="size-3.5" />
        </button>
      </div>
      <p
        className="text-body-sm leading-base text-text-tertiary flex h-[53px] max-w-[324px] items-center md:mt-2 md:h-auto md:max-w-none"
        id="invite-member-description"
      >
        Send an invitation to join the {projectName} workspace.
      </p>
    </>
  );
}
