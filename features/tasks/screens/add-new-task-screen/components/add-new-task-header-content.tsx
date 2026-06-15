import type { ReactElement } from 'react';

export function AddNewTaskHeaderContent(): ReactElement {
  return (
    <div className="flex flex-col gap-1.5 lg:gap-2">
      <h1
        className="text-text-primary text-headline-md lg:leading-display lg:text-[32px] lg:font-semibold"
        id="add-new-task-title"
      >
        Create New Task
      </h1>
      <p className="text-text-secondary max-w-lg text-[14px] leading-[21px]">
        Initialize a new work item within the Architectural Workspace ecosystem.
      </p>
    </div>
  );
}
