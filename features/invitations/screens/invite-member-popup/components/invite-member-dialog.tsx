import type { ReactElement } from 'react';
import { Modal } from '@/components/ui';
import { InviteMemberForm } from './form';
import { InviteMemberHeader } from './invite-member-header';

type InviteMemberDialogProps = {
  onClose: () => void;
  projectId: string;
  projectName: string;
};

export function InviteMemberDialog({
  onClose,
  projectId,
  projectName,
}: InviteMemberDialogProps): ReactElement {
  return (
    <Modal
      aria-describedby="invite-member-description"
      aria-labelledby="invite-member-title"
      bodyClassName="!p-0"
      className="h-[460px] shadow-[0px_-4px_12px_rgba(4,27,60,0.06)] md:h-[385px] md:shadow-[0px_24px_48px_-12px_rgba(4,27,60,0.12)]"
      initialFocus="container"
      onClose={onClose}
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
        <InviteMemberHeader onClose={onClose} projectName={projectName} />
        <InviteMemberForm onClose={onClose} projectId={projectId} />
      </div>
    </Modal>
  );
}
