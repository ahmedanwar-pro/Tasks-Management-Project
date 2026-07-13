import {
  getProjects,
  type ProjectResponse,
} from '@/features/projects/screens/projects-list-screen/api/get-projects';

export type StatisticsProjectOption = {
  label: string;
  value: string | null;
};

export const allProjectsStatisticsOption: StatisticsProjectOption = {
  label: 'All Projects',
  value: null,
};

const defaultProjectOptionsPageSize = 50;

function mapProjectOption(project: ProjectResponse): StatisticsProjectOption {
  return {
    label: project.name,
    value: project.id,
  };
}

export async function getStatisticsProjectOptions(
  pageSize = defaultProjectOptionsPageSize,
): Promise<StatisticsProjectOption[]> {
  const projectsById = new Map<string, ProjectResponse>();
  let offset = 0;
  let totalCount = Number.POSITIVE_INFINITY;

  while (offset < totalCount) {
    const response = await getProjects({ limit: pageSize, offset });

    totalCount = response.totalCount;

    if (response.projects.length === 0) {
      break;
    }

    response.projects.forEach((project) => {
      projectsById.set(project.id, project);
    });

    offset += response.projects.length;
  }

  return [
    allProjectsStatisticsOption,
    ...Array.from(projectsById.values()).map(mapProjectOption),
  ];
}
