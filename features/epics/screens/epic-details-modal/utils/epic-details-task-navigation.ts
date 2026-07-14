export type EpicDetailsTaskSuccessType = 'created';

export function getEpicDetailsTaskHref(
  projectId: string,
  epicId: string,
  page: number,
  successType?: EpicDetailsTaskSuccessType,
): string {
  const queryParts = [`page=${page}`];

  if (successType) {
    queryParts.push(`taskSuccess=${successType}`);
  }

  return `/projects/${projectId}/epics/${epicId}?${queryParts.join('&')}`;
}

export function getEpicDetailsTaskSuccessMessage(
  successType: EpicDetailsTaskSuccessType,
): string {
  return successType === 'created' ? 'Task created successfully' : successType;
}
