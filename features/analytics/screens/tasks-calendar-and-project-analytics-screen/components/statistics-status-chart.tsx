import { Card } from '@/components/ui';
import { projectTasksBoardStatuses } from '@/features/tasks/screens/project-tasks-board-screen/utils';
import type { StatisticsCalendarKpiData } from '../types';
import {
  formatCount,
  getPositiveStatusEntries,
} from '../utils/statistics-display-utils';
import {
  RefreshingIndicator,
  SectionBackgroundError,
  SkeletonBlock,
} from './statistics-section-states';

export function StatusChart({
  data,
  hasBackgroundError,
  isRefreshing,
  onRetry,
}: {
  data: StatisticsCalendarKpiData;
  hasBackgroundError: boolean;
  isRefreshing: boolean;
  onRetry: () => void;
}) {
  const entries = getPositiveStatusEntries(data.statusTotals);
  const total = entries.reduce((sum, { count }) => sum + count, 0);
  const chartSegments = entries.reduce<
    Array<{
      count: number;
      offset: number;
      percentage: number;
      config: (typeof projectTasksBoardStatuses)[number];
    }>
  >((segments, entry) => {
    const percentage = total > 0 ? (entry.count / total) * 100 : 0;
    const offset = segments.reduce(
      (sum, segment) => sum + segment.percentage,
      0,
    );

    return [...segments, { ...entry, offset, percentage }];
  }, []);

  return (
    <Card className="min-h-45 p-5 lg:p-6" padding="none">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold">Tasks by Status</h3>
        <RefreshingIndicator show={isRefreshing} />
      </div>
      <div className="mt-2">
        <SectionBackgroundError
          message="Status totals could not be refreshed."
          onRetry={onRetry}
          show={hasBackgroundError}
        />
      </div>
      <p className="sr-only">
        {total > 0
          ? `Total tasks by status: ${entries
              .map(
                ({ config, count }) =>
                  `${config.statisticsLabel} ${formatCount(count)}`,
              )
              .join(', ')}.`
          : 'No tasks by status for this range.'}
      </p>
      <div className="mt-5 flex flex-col gap-6 xl:flex-row xl:items-center xl:gap-8">
        <div className="relative mx-auto flex size-40 shrink-0 items-center justify-center lg:size-48">
          <svg
            aria-hidden="true"
            className="size-full -rotate-90"
            viewBox="0 0 40 40"
          >
            <circle
              className="text-surface-muted"
              cx="20"
              cy="20"
              fill="none"
              r="15.9155"
              stroke="currentColor"
              strokeWidth="5"
            />
            {chartSegments.map(({ config, offset, percentage }) => (
              <circle
                className={config.chartClassName}
                cx="20"
                cy="20"
                fill="none"
                key={config.status}
                r="15.9155"
                stroke="currentColor"
                strokeDasharray={`${percentage} ${100 - percentage}`}
                strokeDashoffset={-offset}
                strokeWidth="5"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-text-primary text-3xl leading-9 font-extrabold">
              {formatCount(total)}
            </span>
            <span className="text-text-secondary text-[10px] leading-[15px] font-bold uppercase">
              Total
            </span>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {entries.length > 0 ? (
            entries.map(({ config, count }) => (
              <div className="flex items-center gap-3" key={config.status}>
                <span
                  aria-hidden="true"
                  className={`size-3 shrink-0 rounded-full ${config.accentClassName}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-3 text-xs leading-4 font-bold">
                    <span className="text-text-secondary truncate lg:overflow-visible lg:whitespace-normal xl:overflow-hidden xl:whitespace-nowrap">
                      {config.statisticsLabel}
                    </span>
                    <span className="text-text-primary shrink-0">
                      {formatCount(count)}
                    </span>
                  </div>
                  <div className="bg-surface-muted mt-1 h-1 rounded-xl">
                    <div
                      className={`h-full rounded-xl ${config.accentClassName}`}
                      style={{
                        width: `${total > 0 ? (count / total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span
              aria-live="polite"
              className="text-text-muted text-sm"
              role="status"
            >
              No tasks in this range.
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

export function StatusChartSkeleton() {
  return (
    <Card aria-busy="true" className="min-h-45 p-5 lg:p-6" padding="none">
      <SkeletonBlock className="h-6 w-36" />
      <div className="mt-5 flex flex-col gap-6 xl:flex-row xl:items-center xl:gap-8">
        <SkeletonBlock className="mx-auto size-40 shrink-0 rounded-full lg:size-48" />
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {[0, 1, 2, 3].map((item) => (
            <div className="flex items-center gap-3" key={item}>
              <SkeletonBlock className="size-3 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-3">
                  <SkeletonBlock className="h-4 w-24" />
                  <SkeletonBlock className="h-4 w-8" />
                </div>
                <SkeletonBlock className="mt-1 h-1 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
