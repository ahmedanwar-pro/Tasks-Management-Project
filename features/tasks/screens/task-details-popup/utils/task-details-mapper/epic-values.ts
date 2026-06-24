import type { TaskDetailsResponse } from '../../api';
import { getRecordText, getText } from './text-values';

export function getEpicLabel(task: TaskDetailsResponse): string {
  const epicKey =
    getText(task.epic_label) ||
    getText(task.epic_key) ||
    getRecordText(task.epic, ['epic_id', 'key', 'label', 'name']) ||
    getText(task.epic) ||
    getText(task.epic_id);
  const epicTitle =
    getText(task.epic_title) || getRecordText(task.epic, ['title']);

  if (epicKey && epicTitle) {
    return `${epicKey} (${epicTitle})`;
  }

  return epicKey || 'No epic';
}
