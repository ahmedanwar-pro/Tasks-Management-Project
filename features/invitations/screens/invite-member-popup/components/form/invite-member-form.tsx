import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useInviteMemberMutation } from '../../hooks';
import { inviteMemberSchema } from '../../utils';
import type { InviteMemberFormValues } from '../../utils';
import { InviteMemberEmailField } from './invite-member-email-field';
import { InviteMemberFeedback } from './invite-member-feedback';
import { InviteMemberFormActions } from './invite-member-form-actions';

type InviteMemberFormProps = {
  onClose: () => void;
  projectId: string;
};

export function InviteMemberForm({
  onClose,
  projectId,
}: InviteMemberFormProps): ReactElement {
  const { error, isPending, isSuccess, mutate, reset } =
    useInviteMemberMutation();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset: resetForm,
  } = useForm<InviteMemberFormValues>({
    defaultValues: { email: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(inviteMemberSchema),
  });

  function handleInviteMemberSubmit(values: InviteMemberFormValues): void {
    if (isPending) {
      return;
    }

    reset();
    mutate(
      { email: values.email.trim(), projectId },
      { onSuccess: () => resetForm() },
    );
  }

  function handleFormChange(): void {
    if (error || isSuccess) {
      reset();
    }
  }

  return (
    <form
      aria-labelledby="invite-member-title"
      className="mt-[27px] md:mt-6"
      noValidate
      onChange={handleFormChange}
      onSubmit={handleSubmit(handleInviteMemberSubmit)}
    >
      <InviteMemberEmailField
        error={errors.email?.message}
        registration={register('email')}
      />
      <InviteMemberFeedback
        error={error?.message}
        success={isSuccess ? 'Invitation sent successfully' : undefined}
      />
      <InviteMemberFormActions isSubmitting={isPending} onCancel={onClose} />
    </form>
  );
}
