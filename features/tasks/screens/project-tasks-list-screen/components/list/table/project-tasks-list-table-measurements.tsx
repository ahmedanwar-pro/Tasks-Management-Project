import type { ReactElement, RefObject } from 'react';

type ProjectTasksListTableMeasurementsProps = {
  completedMeasureRef: RefObject<HTMLSpanElement | null>;
  dueDateMeasureRef: RefObject<HTMLSpanElement | null>;
  inProgressMeasureRef: RefObject<HTMLSpanElement | null>;
  longestTaskId: string;
  taskIdMeasureRef: RefObject<HTMLSpanElement | null>;
};

export function ProjectTasksListTableMeasurements({
  completedMeasureRef,
  dueDateMeasureRef,
  inProgressMeasureRef,
  longestTaskId,
  taskIdMeasureRef,
}: ProjectTasksListTableMeasurementsProps): ReactElement {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none invisible absolute text-[12px] leading-4 font-normal whitespace-nowrap"
        ref={taskIdMeasureRef}
      >
        {longestTaskId}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none invisible absolute min-h-[21px] px-2.5 py-0 text-[11px] leading-[16.5px] font-bold tracking-normal whitespace-nowrap uppercase"
        ref={inProgressMeasureRef}
      >
        IN PROGRESS
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none invisible absolute min-h-[21px] px-2.5 py-0 text-[11px] leading-[16.5px] font-bold tracking-normal whitespace-nowrap uppercase"
        ref={completedMeasureRef}
      >
        COMPLETED
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none invisible absolute text-[14px] leading-[17px] whitespace-nowrap"
        ref={dueDateMeasureRef}
      >
        No due date
      </span>
    </>
  );
}
