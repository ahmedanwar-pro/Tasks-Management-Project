export type ProjectTasksBoardSuccessType = 'created';

export function getProjectTasksBoardHref(
  projectId: string,
  successType?: ProjectTasksBoardSuccessType,
): string {
  const queryParts = ['view=board'];

  if (successType) {
    queryParts.push(`success=${successType}`);
  }

  return `/projects/${projectId}/tasks?${queryParts.join('&')}`;
}

export function getProjectTasksBoardSuccessMessage(
  successType: ProjectTasksBoardSuccessType,
): string {
  return successType === 'created' ? 'Task created successfully' : successType;
}
