import type { ReactElement } from 'react';

type TaskDetailsDescriptionProps = {
  description: string;
};

export function TaskDetailsDescription({
  description,
}: TaskDetailsDescriptionProps): ReactElement {
  return (
    <section
      aria-labelledby="task-details-description"
      className="flex w-full flex-col gap-3"
    >
      <h3
        className="text-label-sm text-text-secondary leading-compact font-bold tracking-[0.5px] uppercase"
        id="task-details-description"
      >
        Description
      </h3>
      <p className="text-body-sm text-text-primary leading-[22.75px] font-normal tracking-normal">
        {description}
      </p>
    </section>
  );
}
