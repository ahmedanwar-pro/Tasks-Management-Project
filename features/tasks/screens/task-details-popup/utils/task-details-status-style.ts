import { projectTasksBoardStatuses } from '../../project-tasks-board-screen/utils';

function normalizeStatus(value: string): string {
  return value.trim().replaceAll(' ', '_').toUpperCase();
}

export function getTaskDetailsStatusClassName(status: string): string {
  const normalizedStatus = normalizeStatus(status);
  const config = projectTasksBoardStatuses.find(
    ({ label, status: configStatus }) =>
      configStatus === normalizedStatus ||
      normalizeStatus(label) === normalizedStatus,
  );

  return (
    config?.badgeClassName ?? 'bg-primary-container-muted text-text-secondary'
  );
}
