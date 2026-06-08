import type { ProjectEpicResponse } from '../../shared/types';

export type GetProjectEpicsRequest = {
  limit: number;
  offset: number;
  projectId: string;
};

export type GetProjectEpicsResponse = {
  epics: ProjectEpicResponse[];
  totalCount: number;
};
