'use client';

import { useRouter } from 'next/navigation';
import {
  useProjectMembersQuery,
  useProjectNameQuery,
} from '@/features/members/screens/project-members-list-screen/hooks';
import type { AddNewTaskFormValues } from '../add-new-task-form-schema';
import {
  mapAddNewTaskFormToRequest,
  mapTaskAssigneeOption,
  mapTaskEpicSelectOption,
  type TaskAssigneeOption,
  type TaskEpicSelectOption,
} from '../utils';
import { getEpicDetailsTaskHref } from '@/features/epics/screens/epic-details-modal/utils/epic-details-task-navigation';
import {
  getCreatedProjectTaskDestinationPage,
  getProjectTasksListHref,
} from '../../project-tasks-list-screen/utils/project-tasks-list-navigation';
import { useCreateTaskMutation } from './use-create-task-mutation';
import { useTaskEpicOptionsQuery } from './use-task-epic-options-query';

type AddNewTaskScreenData = {
  assigneeOptions: TaskAssigneeOption[];
  assigneeOptionsError: Error | null;
  createError: Error | null;
  epicOptions: TaskEpicSelectOption[];
  epicOptionsError: Error | null;
  handleCreateTask: (values: AddNewTaskFormValues) => void;
  isAssigneeOptionsLoading: boolean;
  isCreating: boolean;
  isEpicOptionsLoading: boolean;
  projectName: string;
  resetCreateTask: () => void;
  retryAssigneeOptions: () => void;
  retryEpicOptions: () => void;
};

export function useAddNewTaskScreenData(
  projectId: string,
  initialEpicId?: string,
  initialPage = 1,
  initialSource?: 'epic-details',
): AddNewTaskScreenData {
  const router = useRouter();
  const { data: project } = useProjectNameQuery(projectId);
  const {
    data: epicOptionsData,
    error: epicOptionsError,
    isPending: isEpicOptionsPending,
    refetch: refetchEpicOptions,
  } = useTaskEpicOptionsQuery(projectId);
  const {
    data: membersData,
    error: membersError,
    isPending: isMembersPending,
    refetch: refetchMembers,
  } = useProjectMembersQuery(projectId);
  const {
    error: createTaskError,
    isPending: isCreateTaskPending,
    mutate: createTask,
    reset: resetCreateTask,
  } = useCreateTaskMutation(projectId);

  function handleCreateTask(values: AddNewTaskFormValues): void {
    resetCreateTask();
    createTask(mapAddNewTaskFormToRequest(values, projectId), {
      onSuccess: () => {
        if (initialSource === 'epic-details' && initialEpicId) {
          router.push(
            getEpicDetailsTaskHref(
              projectId,
              initialEpicId,
              initialPage,
              'created',
            ),
          );
          return;
        }

        router.push(
          getProjectTasksListHref(
            projectId,
            getCreatedProjectTaskDestinationPage(),
            'created',
          ),
        );
      },
    });
  }

  return {
    assigneeOptions: (membersData?.members ?? []).map(mapTaskAssigneeOption),
    assigneeOptionsError: membersError,
    createError: createTaskError,
    epicOptions: (epicOptionsData?.epics ?? []).map(mapTaskEpicSelectOption),
    epicOptionsError,
    handleCreateTask,
    isAssigneeOptionsLoading: isMembersPending,
    isCreating: isCreateTaskPending,
    isEpicOptionsLoading: isEpicOptionsPending,
    projectName: project?.name ?? 'Project',
    resetCreateTask,
    retryAssigneeOptions: () => {
      void refetchMembers();
    },
    retryEpicOptions: () => {
      void refetchEpicOptions();
    },
  };
}
