import type { TaskEpicOption } from '../api';

export type TaskEpicSelectOption = {
  id: string;
  label: string;
};

const maxTaskEpicTitleLength = 100;

function truncateEpicTitle(title: string): string {
  const characters = Array.from(title);

  if (characters.length <= maxTaskEpicTitleLength) {
    return title;
  }

  return `${characters.slice(0, maxTaskEpicTitleLength).join('')}...`;
}

export function mapTaskEpicSelectOption(
  epic: TaskEpicOption,
): TaskEpicSelectOption {
  return {
    id: epic.id,
    label: `${epic.epicId} ${truncateEpicTitle(epic.title)}`,
  };
}
