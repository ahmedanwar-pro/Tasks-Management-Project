'use client';

import { useEffect, useMemo, useState, type RefObject } from 'react';
import type { ProjectTasksListItem } from '../types';

const desktopBreakpointWidth = 1280;
const taskIdCellHorizontalPadding = 48;
const statusCellHorizontalPadding = 48;
const dueDateCellHorizontalPadding = 48;

const columnRatios = {
  compact: {
    dueDate: 0.13,
    status: 0.17,
    taskId: 0.1,
  },
  desktop: {
    dueDate: 0.1345,
    status: 0.143,
    taskId: 0.1092,
  },
};

function getLongestTaskId(tasks: ProjectTasksListItem[]): string {
  return tasks.reduce(
    (longestTaskId, task) =>
      task.taskId.length > longestTaskId.length ? task.taskId : longestTaskId,
    '',
  );
}

type UseProjectTasksListTableLayoutProps = {
  completedMeasureRef: RefObject<HTMLSpanElement | null>;
  dueDateMeasureRef: RefObject<HTMLSpanElement | null>;
  inProgressMeasureRef: RefObject<HTMLSpanElement | null>;
  tableContainerRef: RefObject<HTMLDivElement | null>;
  taskIdMeasureRef: RefObject<HTMLSpanElement | null>;
  tasks: ProjectTasksListItem[];
};

export function useProjectTasksListTableLayout({
  completedMeasureRef,
  dueDateMeasureRef,
  inProgressMeasureRef,
  tableContainerRef,
  taskIdMeasureRef,
  tasks,
}: UseProjectTasksListTableLayoutProps) {
  const [shouldShortenCompleted, setShouldShortenCompleted] = useState(false);
  const [shouldShortenInProgress, setShouldShortenInProgress] = useState(false);
  const [shouldStackDueDates, setShouldStackDueDates] = useState(false);
  const [shouldSplitTaskIds, setShouldSplitTaskIds] = useState(false);
  const longestTaskId = useMemo(() => getLongestTaskId(tasks), [tasks]);

  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    const completedMeasure = completedMeasureRef.current;
    const dueDateMeasure = dueDateMeasureRef.current;
    const inProgressMeasure = inProgressMeasureRef.current;
    const taskIdMeasure = taskIdMeasureRef.current;

    if (
      !tableContainer ||
      !completedMeasure ||
      !dueDateMeasure ||
      !taskIdMeasure ||
      !inProgressMeasure
    ) {
      return;
    }

    const measuredTableContainer = tableContainer;
    const measuredCompleted = completedMeasure;
    const measuredDueDate = dueDateMeasure;
    const measuredInProgress = inProgressMeasure;
    const measuredTaskId = taskIdMeasure;

    function updateMeasuredLayouts(): void {
      const ratios =
        window.innerWidth >= desktopBreakpointWidth
          ? columnRatios.desktop
          : columnRatios.compact;
      const tableWidth = measuredTableContainer.clientWidth;
      const availableTaskIdWidth =
        tableWidth * ratios.taskId - taskIdCellHorizontalPadding;
      const availableStatusWidth =
        tableWidth * ratios.status - statusCellHorizontalPadding;
      const availableDueDateWidth =
        tableWidth * ratios.dueDate - dueDateCellHorizontalPadding;

      setShouldSplitTaskIds(
        longestTaskId
          ? measuredTaskId.scrollWidth > availableTaskIdWidth
          : false,
      );
      setShouldShortenInProgress(
        measuredInProgress.scrollWidth > availableStatusWidth,
      );
      setShouldShortenCompleted(
        measuredCompleted.scrollWidth > availableStatusWidth,
      );
      setShouldStackDueDates(
        measuredDueDate.scrollWidth > availableDueDateWidth,
      );
    }

    updateMeasuredLayouts();

    const resizeObserver = new ResizeObserver(updateMeasuredLayouts);
    resizeObserver.observe(measuredTableContainer);

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    completedMeasureRef,
    dueDateMeasureRef,
    inProgressMeasureRef,
    longestTaskId,
    tableContainerRef,
    taskIdMeasureRef,
  ]);

  return {
    longestTaskId,
    shouldShortenCompleted,
    shouldShortenInProgress,
    shouldStackDueDates,
    shouldSplitTaskIds,
  };
}
