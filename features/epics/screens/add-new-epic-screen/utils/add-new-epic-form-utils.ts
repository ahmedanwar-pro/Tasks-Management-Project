import type { CreateEpicRequest } from '../api';
import type { AddNewEpicFormValues } from '../add-new-epic-form-schema';

export const addNewEpicDefaultValues: AddNewEpicFormValues = {
  assigneeId: '',
  deadline: '',
  description: '',
  title: '',
};

export function mapAddNewEpicFormToRequest(
  values: AddNewEpicFormValues,
  projectId: string,
): CreateEpicRequest {
  const trimmedDescription = values.description.trim();
  const trimmedTitle = values.title.trim();

  return {
    assignee_id: values.assigneeId || null,
    deadline: values.deadline || null,
    description: trimmedDescription || null,
    project_id: projectId,
    title: trimmedTitle,
  };
}
