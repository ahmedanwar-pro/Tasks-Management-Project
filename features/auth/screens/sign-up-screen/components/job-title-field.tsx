import type { ReactElement } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { AuthField } from '../../../components';

type JobTitleFieldProps = {
  error?: string;
  registration: UseFormRegisterReturn<'jobTitle'>;
};

function JobTitleLabel(): ReactElement {
  return (
    <>
      <span>Job Title</span>
      <span className="text-text-muted font-normal tracking-normal lowercase">
        {' '}
        (Optional)
      </span>
    </>
  );
}

export function JobTitleField({
  error,
  registration,
}: JobTitleFieldProps): ReactElement {
  return (
    <AuthField
      autoComplete="organization-title"
      error={error}
      label={<JobTitleLabel />}
      placeholder="e.g. Project Manager"
      {...registration}
    />
  );
}
