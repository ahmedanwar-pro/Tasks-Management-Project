import { Card } from '@/components/ui';
import type { StatisticsCalendarKpiData } from '../types';
import { formatCount } from '../utils/statistics-display-utils';
import { SummaryIcon } from './statistics-icons';
import {
  RefreshingIndicator,
  SectionBackgroundError,
  SkeletonBlock,
} from './statistics-section-states';

const summaryCardsListClassName =
  '-mx-4 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden';

function SummaryCard({
  count,
  label,
  type,
}: {
  count: number;
  label: string;
  type: 'completed' | 'overdue' | 'total';
}) {
  return (
    <Card
      className="flex h-28 min-w-35 shrink-0 snap-start flex-col justify-between p-4 lg:h-26 lg:min-w-0 lg:flex-row lg:items-center lg:p-6"
      padding="none"
    >
      <div className="order-2 lg:order-1">
        <h3 className="text-text-secondary text-[10px] leading-[15px] font-bold tracking-[0.05em] uppercase lg:text-xs lg:leading-4">
          {label}
        </h3>
        <p
          className={`text-xl leading-7 font-bold lg:text-3xl lg:leading-9 ${type === 'overdue' ? 'text-danger' : 'text-text-primary'}`}
        >
          {formatCount(count)}
        </p>
      </div>
      <span
        className={`order-1 flex size-5 items-center justify-center lg:order-2 lg:size-12 lg:rounded-xs ${type === 'overdue' ? 'text-danger lg:bg-danger-container/20' : type === 'completed' ? 'text-success-icon lg:bg-[#006844]/10' : 'text-primary-container lg:bg-primary-container/10'}`}
      >
        <SummaryIcon type={type} />
      </span>
    </Card>
  );
}

export function SummaryCards({
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
  return (
    <section
      aria-labelledby="quick-overview-heading"
      className="flex flex-col gap-3"
    >
      <h2
        className="text-text-secondary px-1 text-[10px] leading-[15px] font-bold tracking-[0.1em] uppercase lg:sr-only"
        id="quick-overview-heading"
      >
        Quick Overview
      </h2>
      <RefreshingIndicator show={isRefreshing} />
      <SectionBackgroundError
        message="Task totals could not be refreshed."
        onRetry={onRetry}
        show={hasBackgroundError}
      />
      <div className={summaryCardsListClassName}>
        <SummaryCard count={data.totalTasks} label="Total Tasks" type="total" />
        <SummaryCard
          count={data.doneTasks}
          label="Completed Tasks"
          type="completed"
        />
        <SummaryCard
          count={data.overdueTasks}
          label="Overdue Tasks"
          type="overdue"
        />
      </div>
    </section>
  );
}

export function SummaryCardsSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-labelledby="quick-overview-heading"
      className="flex flex-col gap-3"
    >
      <h2
        className="text-text-secondary px-1 text-[10px] leading-[15px] font-bold tracking-[0.1em] uppercase lg:sr-only"
        id="quick-overview-heading"
      >
        Quick Overview
      </h2>
      <div className={summaryCardsListClassName}>
        {['total', 'completed', 'overdue'].map((key) => (
          <Card
            className="flex h-28 min-w-35 shrink-0 snap-start flex-col justify-between p-4 lg:h-26 lg:min-w-0 lg:flex-row lg:items-center lg:p-6"
            key={key}
            padding="none"
          >
            <div className="order-2 flex flex-col gap-2 lg:order-1">
              <SkeletonBlock className="h-3 w-20" />
              <SkeletonBlock className="h-7 w-12 lg:h-9" />
            </div>
            <SkeletonBlock className="order-1 size-5 lg:order-2 lg:size-12" />
          </Card>
        ))}
      </div>
    </section>
  );
}
