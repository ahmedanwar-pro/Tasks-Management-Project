import type { ReactElement } from 'react';

type ProjectTasksBoardTitleProps = {
  projectName: string;
};

export function ProjectTasksBoardTitle({
  projectName,
}: ProjectTasksBoardTitleProps): ReactElement {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <h1
        className="text-text-primary text-[30px] leading-[36px] font-semibold tracking-[-0.75px]"
        id="project-tasks-board-title"
      >
        Active Workboard
      </h1>
      <p className="text-[14px] leading-[20px] font-normal text-[#64748b]">
        Curating {projectName}&apos;s production pipeline and milestones.
      </p>
    </div>
  );
}
