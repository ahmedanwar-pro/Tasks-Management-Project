import { useMemo, useState } from 'react';
import type { TaskStatus } from '@/features/tasks/screens/add-new-task-screen/add-new-task-form-schema';
import type { StatisticsFilterController, StatisticsFilters } from '../types';
import {
  getDefaultStatisticsDateRange,
  getStatisticsDateRangeError,
  shiftStatisticsDateRange,
  type StatisticsDateRange,
} from '../utils';

export function useStatisticsFilters(): StatisticsFilterController {
  const defaultDateRange = useMemo(() => getDefaultStatisticsDateRange(), []);
  const [appliedFilters, setAppliedFilters] = useState<StatisticsFilters>({
    ...defaultDateRange,
    projectId: null,
    status: null,
  });
  const [draftDateRange, setDraftDateRange] =
    useState<StatisticsDateRange>(defaultDateRange);
  const [datePanelOpen, setDatePanelOpen] = useState(false);
  const dateRangeError = getStatisticsDateRangeError(draftDateRange);

  function openDatePanel() {
    setDraftDateRange({
      endDate: appliedFilters.endDate,
      startDate: appliedFilters.startDate,
    });
    setDatePanelOpen(true);
  }

  function closeDatePanel() {
    setDraftDateRange({
      endDate: appliedFilters.endDate,
      startDate: appliedFilters.startDate,
    });
    setDatePanelOpen(false);
  }

  function applyDraftDateRange() {
    if (dateRangeError) {
      return;
    }

    setAppliedFilters((current) => ({ ...current, ...draftDateRange }));
    setDatePanelOpen(false);
  }

  function setProjectId(projectId: string | null) {
    setAppliedFilters((current) => ({ ...current, projectId }));
  }

  function setStatus(status: TaskStatus | null) {
    setAppliedFilters((current) => ({ ...current, status }));
  }

  function shiftAppliedDateRange(days: number) {
    setAppliedFilters((current) => ({
      ...current,
      ...shiftStatisticsDateRange(current, days),
    }));
  }

  return {
    appliedFilters,
    applyDraftDateRange,
    closeDatePanel,
    datePanelOpen,
    dateRangeError,
    draftDateRange,
    openDatePanel,
    setDraftDateRange,
    setProjectId,
    setStatus,
    shiftAppliedDateRange,
  };
}
