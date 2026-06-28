import type { ProjectTaskResponse } from '../../project-tasks-board-screen/api';

export type GetProjectTasksRequest = {
  limit: number;
  offset: number;
  projectId: string;
};

export type GetProjectTasksResponse = {
  tasks: ProjectTaskResponse[];
  totalCount: number;
};
