import type { ReactElement } from 'react';
import { EditProjectCard, EditProjectPageHeader } from './components';

export function EditProjectScreen(): ReactElement {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pt-8 pb-12 lg:px-8">
      <EditProjectPageHeader />
      <EditProjectCard />
    </section>
  );
}
