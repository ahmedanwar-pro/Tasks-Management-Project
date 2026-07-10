'use client';

import { useEffect, type ReactElement, type ReactNode } from 'react';
import { useTaskEpicOptionsQuery } from '@/features/tasks/screens/add-new-task-screen/hooks';
import { mapTaskEpicSelectOption } from '@/features/tasks/screens/add-new-task-screen/utils';
import { EditableTaskSelect } from '../select/editable-task-select';

type EditableTaskEpicProps = {
  className?: string;
  currentLabel: string;
  epicId: string | null;
  isSaving: boolean;
  leadingIcon?: ReactNode;
  onSave: (epicId: string | null) => Promise<void>;
  onStaleEpic: () => void;
  projectId: string;
};

export function EditableTaskEpic({
  className,
  currentLabel,
  epicId,
  isSaving,
  leadingIcon,
  onSave,
  onStaleEpic,
  projectId,
}: EditableTaskEpicProps): ReactElement {
  const { data, error, isPending, refetch } =
    useTaskEpicOptionsQuery(projectId);
  const options = (data?.epics ?? [])
    .map(mapTaskEpicSelectOption)
    .map((option) => ({
      label: option.label,
      value: option.id,
    }));
  const hasLoadedOptions = Boolean(data) && !isPending;
  const isStale =
    Boolean(epicId) &&
    hasLoadedOptions &&
    !options.some((option) => option.value === epicId);

  useEffect(() => {
    if (isStale) onStaleEpic();
  }, [isStale, onStaleEpic]);

  return (
    <EditableTaskSelect
      allowClear
      ariaLabel="Task epic"
      className={className}
      currentLabel={isStale ? 'No epic' : currentLabel}
      currentValue={isStale ? null : epicId}
      error={error?.message}
      hoverClassName="enabled:hover:brightness-[0.97]"
      isLoading={isPending}
      isSaving={isSaving}
      leadingIcon={leadingIcon}
      onRetry={() => void refetch()}
      onSave={onSave}
      options={options}
    />
  );
}
