import { Card } from '@/components/ui';
import type {
  StatisticsCalendarKpiData,
  StatisticsFilterController,
} from '../types';
import { getStatisticsRangeDates, toStatisticsDateInputValue } from '../utils';
import {
  emptyStatusCounts,
  formatCount,
  getPositiveStatusEntries,
} from '../utils/statistics-display-utils';
import { EmptyCalendarIcon } from './statistics-icons';
import {
  RefreshingIndicator,
  SectionBackgroundError,
  SkeletonBlock,
} from './statistics-section-states';

export function CalendarShell({
  data,
  filters,
  hasBackgroundError,
  isRefreshing,
  onRetry,
}: {
  data: StatisticsCalendarKpiData;
  filters: StatisticsFilterController;
  hasBackgroundError: boolean;
  isRefreshing: boolean;
  onRetry: () => void;
}) {
  const dates = getStatisticsRangeDates(filters.appliedFilters);
  const todayKey = toStatisticsDateInputValue(new Date());
  const daysByDate = new Map(data.daily.map((day) => [day.day, day]));

  return (
    <section
      aria-labelledby="statistics-calendar-heading"
      className="flex flex-col gap-3"
    >
      <h2
        className="text-text-primary px-1 text-lg leading-7 font-bold lg:sr-only"
        id="statistics-calendar-heading"
      >
        Calendar
      </h2>
      <RefreshingIndicator show={isRefreshing} />
      <SectionBackgroundError
        message="Calendar data could not be refreshed."
        onRetry={onRetry}
        show={hasBackgroundError}
      />
      <div className="grid gap-2 lg:grid-cols-4 lg:gap-3 xl:grid-cols-7">
        {dates.map((date) => {
          const key = toStatisticsDateInputValue(date);
          const dayData = daysByDate.get(key);
          const statusEntries = getPositiveStatusEntries(
            dayData?.statuses ?? emptyStatusCounts,
          );
          const day = date.toLocaleDateString('en-US', { weekday: 'short' });
          const label = date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
          });
          const mobileLabel = date.toLocaleDateString('en-US', {
            day: 'numeric',
          });
          const isToday = key === todayKey;

          return (
            <Card
              className={`relative flex min-h-13 items-center overflow-visible p-3 lg:min-h-105 lg:flex-col lg:items-stretch lg:p-4 ${isToday ? 'border-border-muted border-2 lg:[border-color:var(--color-primary-container)]' : ''}`}
              key={key}
              padding="none"
            >
              {isToday && (
                <>
                  <span
                    aria-hidden="true"
                    className="bg-primary-container absolute inset-y-0 left-0 w-1 rounded-l-md lg:hidden"
                  />
                  <span className="bg-primary-container text-text-inverse absolute top-1/2 right-3 -translate-y-1/2 rounded-md px-2 py-0 text-[8px] leading-[15px] font-bold tracking-[0.8px] uppercase lg:top-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:px-3 lg:py-0.5 lg:text-[10px] lg:tracking-[1px]">
                    Today
                  </span>
                </>
              )}
              <header className="flex w-12 flex-col lg:w-auto">
                <span
                  className={`${isToday ? 'text-primary-container' : 'text-text-secondary'} text-[9px] font-bold uppercase lg:text-xs`}
                >
                  {day}
                </span>
                <span
                  className={`${isToday ? 'text-primary-container xl:text-text-primary' : 'text-text-primary'} text-base font-bold lg:text-lg`}
                >
                  <span className="xl:hidden">{mobileLabel}</span>
                  <span className="hidden xl:inline">{label}</span>
                </span>
              </header>
              <span
                aria-hidden="true"
                className="bg-border-muted mx-4 h-6 w-px lg:hidden"
              />
              <div className="flex flex-1 flex-wrap items-center gap-2 lg:mt-4 lg:flex-col lg:items-stretch">
                {statusEntries.length > 0 ? (
                  statusEntries.map(({ config, count }) => (
                    <div
                      className={`flex items-center justify-between gap-3 rounded-xs px-2 py-1 text-[10px] leading-[15px] font-bold lg:w-full ${config.badgeClassName}`}
                      key={config.status}
                    >
                      <span className="uppercase lg:hidden xl:inline">
                        {config.label}
                      </span>
                      <span className="hidden uppercase lg:inline xl:hidden">
                        {config.statisticsLabel}
                      </span>
                      <span>{formatCount(count)}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-text-muted mx-auto text-[10px] leading-[15px] font-bold tracking-[1px] uppercase lg:mt-auto lg:mb-auto lg:flex lg:flex-col lg:items-center lg:gap-2">
                    <span className="hidden text-[#041b3c] lg:block">
                      <EmptyCalendarIcon />
                    </span>
                    <span>No Tasks</span>
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export function CalendarSkeleton({
  filters,
}: {
  filters: StatisticsFilterController;
}) {
  const dates = getStatisticsRangeDates(filters.appliedFilters);

  return (
    <section
      aria-busy="true"
      aria-labelledby="statistics-calendar-heading"
      className="flex flex-col gap-3"
    >
      <h2
        className="text-text-primary px-1 text-lg leading-7 font-bold lg:sr-only"
        id="statistics-calendar-heading"
      >
        Calendar
      </h2>
      <div className="grid gap-2 lg:grid-cols-4 lg:gap-3 xl:grid-cols-7">
        {dates.map((date) => {
          const key = toStatisticsDateInputValue(date);

          return (
            <Card
              className="flex min-h-13 items-center p-3 lg:min-h-105 lg:flex-col lg:items-stretch lg:p-4"
              key={key}
              padding="none"
            >
              <div className="flex w-12 flex-col gap-2 lg:w-auto">
                <SkeletonBlock className="h-3 w-8" />
                <SkeletonBlock className="h-5 w-11" />
              </div>
              <span
                aria-hidden="true"
                className="bg-border-muted mx-4 h-6 w-px lg:hidden"
              />
              <div className="flex flex-1 flex-wrap items-center gap-2 lg:mt-4 lg:flex-col lg:items-stretch">
                <SkeletonBlock className="h-6 w-20 lg:w-full" />
                <SkeletonBlock className="hidden h-6 w-full lg:block" />
                <SkeletonBlock className="hidden h-6 w-full lg:block" />
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
