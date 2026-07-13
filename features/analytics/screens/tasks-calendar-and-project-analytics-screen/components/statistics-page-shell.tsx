import type { ReactElement } from 'react';
import type {
  StatisticsCalendarKpiData,
  StatisticsProjectCount,
  StatisticsScreenData,
  StatisticsSectionState,
} from '../types';
import { emptyCalendarStats } from '../utils/statistics-display-utils';
import { StatisticsFilterBar } from './statistics-filter-bar';
import {
  ProjectCountsCard,
  ProjectCountsSkeleton,
} from './statistics-project-counts-card';
import { SectionError } from './statistics-section-states';
import { StatusChart, StatusChartSkeleton } from './statistics-status-chart';
import { SummaryCards, SummaryCardsSkeleton } from './statistics-summary-cards';
import { CalendarShell, CalendarSkeleton } from './statistics-weekly-calendar';

function StatisticsAreaShell({
  calendarStatsSection,
  projectCountsSection,
}: {
  calendarStatsSection: StatisticsSectionState<StatisticsCalendarKpiData>;
  projectCountsSection: StatisticsSectionState<StatisticsProjectCount[]>;
}) {
  const calendarStats = calendarStatsSection.data ?? emptyCalendarStats;
  const projects = projectCountsSection.data ?? [];
  const showCalendarError =
    Boolean(calendarStatsSection.error) && calendarStatsSection.data === null;
  const showCalendarBackgroundError =
    Boolean(calendarStatsSection.error) && calendarStatsSection.data !== null;
  const showProjectError =
    Boolean(projectCountsSection.error) && projectCountsSection.data === null;
  const showProjectBackgroundError =
    Boolean(projectCountsSection.error) && projectCountsSection.data !== null;

  return (
    <section
      aria-labelledby="task-statistics-heading"
      className="flex flex-col gap-4"
    >
      <h2
        className="text-text-primary px-1 text-lg leading-7 font-bold lg:text-2xl"
        id="task-statistics-heading"
      >
        Task Statistics
      </h2>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        {calendarStatsSection.showSkeleton ? (
          <StatusChartSkeleton />
        ) : showCalendarError ? (
          <SectionError
            className="min-h-45"
            message="Task totals could not be loaded. Try again to refresh this section."
            onRetry={calendarStatsSection.onRetry}
            title="Could not load task statistics"
          />
        ) : (
          <StatusChart
            data={calendarStats}
            hasBackgroundError={showCalendarBackgroundError}
            isRefreshing={calendarStatsSection.isFetching}
            onRetry={calendarStatsSection.onRetry}
          />
        )}
        {projectCountsSection.showSkeleton ? (
          <ProjectCountsSkeleton />
        ) : showProjectError ? (
          <SectionError
            className="min-h-39"
            message="Project totals could not be loaded. The rest of the dashboard can stay visible."
            onRetry={projectCountsSection.onRetry}
            title="Could not load project totals"
          />
        ) : (
          <ProjectCountsCard
            hasBackgroundError={showProjectBackgroundError}
            isRefreshing={projectCountsSection.isFetching}
            onRetry={projectCountsSection.onRetry}
            projects={projects}
          />
        )}
      </div>
    </section>
  );
}

export function StatisticsPageShell({
  screenData,
}: {
  screenData: StatisticsScreenData;
}): ReactElement {
  const { filters } = screenData;
  const calendarStats = screenData.calendarStats.data ?? emptyCalendarStats;
  const showCalendarError =
    Boolean(screenData.calendarStats.error) &&
    screenData.calendarStats.data === null;
  const showCalendarBackgroundError =
    Boolean(screenData.calendarStats.error) &&
    screenData.calendarStats.data !== null;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 pb-24 lg:gap-8 lg:px-8 lg:py-8 lg:pb-8">
      <header className="hidden lg:block">
        <h1 className="text-text-primary text-3xl leading-9 font-bold tracking-[-0.025em]">
          Weekly Planner
        </h1>
        <p className="text-text-secondary text-base leading-6">
          Manage your deadlines and track team velocity.
        </p>
      </header>
      <StatisticsFilterBar
        filters={filters}
        projectOptions={screenData.projectOptions}
      />
      {screenData.calendarStats.showSkeleton ? (
        <>
          <SummaryCardsSkeleton />
          <CalendarSkeleton filters={filters} />
        </>
      ) : showCalendarError ? (
        <SectionError
          className="min-h-52"
          message="Task statistics could not be loaded. Project totals are handled separately below."
          onRetry={screenData.calendarStats.onRetry}
          title="Could not load task statistics"
        />
      ) : (
        <>
          <SummaryCards
            data={calendarStats}
            hasBackgroundError={showCalendarBackgroundError}
            isRefreshing={screenData.calendarStats.isFetching}
            onRetry={screenData.calendarStats.onRetry}
          />
          <CalendarShell
            data={calendarStats}
            filters={filters}
            hasBackgroundError={showCalendarBackgroundError}
            isRefreshing={screenData.calendarStats.isFetching}
            onRetry={screenData.calendarStats.onRetry}
          />
        </>
      )}
      <StatisticsAreaShell
        calendarStatsSection={screenData.calendarStats}
        projectCountsSection={screenData.projectCounts}
      />
    </div>
  );
}
