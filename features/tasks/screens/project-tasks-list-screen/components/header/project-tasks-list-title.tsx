import type { ReactElement } from 'react';

type ProjectTasksListTitleProps = {
  projectName: string;
};

export function ProjectTasksListTitle({
  projectName,
}: ProjectTasksListTitleProps): ReactElement {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <h1
        className="text-text-primary text-[30px] leading-[36px] font-semibold"
        id="project-tasks-list-title"
      >
        Active Workboard
      </h1>
      <p className="hidden text-[14px] leading-[20px] font-normal text-[#64748b] sm:block">
        Curating {projectName}&apos;s production pipeline and milestones.
      </p>
    </div>
  );
}
