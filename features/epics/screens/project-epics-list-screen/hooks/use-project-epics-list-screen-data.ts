'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useProjectMembersBreadcrumbVisibility,
  useProjectNameQuery,
} from '@/features/members/screens/project-members-list-screen/hooks';
import { isProjectUnauthorizedError } from '@/features/projects/screens/edit-project-screen/api';
import { mapProjectEpic } from '../utils';
import type { ProjectEpicListItem } from '../utils';
import { useProjectEpicsQuery } from './use-project-epics-query';

type ProjectEpicsListScreenData = {
  currentPage: number;
  epics: ProjectEpicListItem[];
  isLoading: boolean;
  pageSize: number;
  projectName: string;
  totalCount: number;
};

const projectEpicsPageSize = 6;

export function useProjectEpicsListScreenData(
  projectId: string,
): ProjectEpicsListScreenData {
  const router = useRouter();
  const currentPage = 1;
  const isBreadcrumbVisible = useProjectMembersBreadcrumbVisibility();
  const { data: project } = useProjectNameQuery(
    projectId,
    isBreadcrumbVisible,
  );
  const {
    data: epicsData,
    error: epicsError,
    isPending: areEpicsPending,
  } = useProjectEpicsQuery(projectId, currentPage, projectEpicsPageSize);
  const isUnauthorized = isProjectUnauthorizedError(epicsError);
  const projectName = project?.name ?? 'Project';
  const epics = (epicsData?.epics ?? []).map(mapProjectEpic);
  const totalCount = epicsData?.totalCount ?? 0;

  useEffect(() => {
    if (isUnauthorized) {
      router.replace('/login');
    }
  }, [isUnauthorized, router]);

  return {
    currentPage,
    epics,
    isLoading: areEpicsPending,
    pageSize: projectEpicsPageSize,
    projectName,
    totalCount,
  };
}
