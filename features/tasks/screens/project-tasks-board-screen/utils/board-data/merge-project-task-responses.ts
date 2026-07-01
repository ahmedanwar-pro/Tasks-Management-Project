import type { ProjectTaskResponse } from '../../api';

export function mergeProjectTaskResponses(
  existingTasks: ProjectTaskResponse[],
  incomingTasks: ProjectTaskResponse[],
): ProjectTaskResponse[] {
  const tasksById = new Map(existingTasks.map((task) => [task.id, task]));
  let hasChanges = false;

  incomingTasks.forEach((task) => {
    const existingTask = tasksById.get(task.id);

    if (existingTask !== task) {
      tasksById.set(task.id, task);
      hasChanges = true;
    }
  });

  return hasChanges ? Array.from(tasksById.values()) : existingTasks;
}
