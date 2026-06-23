import type { ReactElement } from 'react';

type TaskDetailsMobileDescriptionProps = {
  description: string;
};

export function TaskDetailsMobileDescription({
  description,
}: TaskDetailsMobileDescriptionProps): ReactElement {
  return (
    <section
      aria-labelledby="task-details-mobile-description"
      className="flex flex-col gap-3"
    >
      <h2
        className="text-body-sm text-text-muted leading-base font-bold uppercase"
        id="task-details-mobile-description"
      >
        Description
      </h2>
      <div className="bg-surface border-border-subtle flex h-[156px] flex-col rounded-md border p-5 shadow-sm">
        <p className="text-body-sm text-text-secondary leading-[22.75px]">
          {description}
        </p>
      </div>
    </section>
  );
}
