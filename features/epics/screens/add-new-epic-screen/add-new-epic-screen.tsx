import type { ReactElement } from 'react';
import {
  AddNewEpicCard,
  AddNewEpicForm,
  AddNewEpicPageHeader,
} from './components';

type AddNewEpicScreenProps = {
  projectId: string;
};

export function AddNewEpicScreen({
  projectId,
}: AddNewEpicScreenProps): ReactElement {
  return (
    <section
      aria-labelledby="add-new-epic-title"
      className="mx-auto w-full max-w-4xl px-6 pt-8 pb-12 lg:pt-10"
    >
      <AddNewEpicPageHeader projectId={projectId} />
      <AddNewEpicCard>
        <AddNewEpicForm projectId={projectId} />
      </AddNewEpicCard>
    </section>
  );
}
