import type { ReactElement } from 'react';

type TaskDetailsTabletDescriptionProps = {
  description: string;
};

export function TaskDetailsTabletDescription({
  description,
}: TaskDetailsTabletDescriptionProps): ReactElement {
  return (
    <section
      aria-labelledby="task-details-tablet-description"
      className="flex flex-col gap-3"
    >
      <h3
        className="text-label-sm leading-compact text-text-secondary font-bold tracking-normal uppercase"
        id="task-details-tablet-description"
      >
        Description
      </h3>
      <div className="border-border-subtle bg-surface rounded-md border p-5 shadow-sm">
        <p className="text-body-sm text-text-primary leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
