import { useRef } from 'react';
import type { ChangeEvent, ReactElement } from 'react';
import { IconButton } from '@/components/ui';
import type { TaskStatus } from '@/features/tasks/screens/add-new-task-screen/add-new-task-form-schema';
import type {
  StatisticsFilterController,
  StatisticsProjectOptionsState,
} from '../types';
import { formatStatisticsDateRange, statisticsStatusOptions } from '../utils';
import { StatisticsDatePanel } from './statistics-date-panel';
import { CalendarIcon, ChevronIcon } from './statistics-icons';

function FilterSelect({
  label,
  onChange,
  value,
  children,
  className,
  disabled,
}: {
  children: ReactElement[] | ReactElement;
  className?: string;
  disabled?: boolean;
  label: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}) {
  return (
    <label
      className={`relative flex min-w-0 items-center xl:flex-none ${className ?? ''}`}
    >
      <span className="sr-only">{label}</span>
      <select
        className="bg-surface-low text-text-primary focus-visible:outline-primary lg:bg-surface h-11 w-full appearance-none rounded-md border-0 py-2 pr-9 pl-4 text-xs font-bold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 lg:h-9 lg:min-w-34 lg:rounded-xs lg:text-sm lg:font-medium"
        disabled={disabled}
        onChange={onChange}
        value={value}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 size-4">
        <ChevronIcon direction="down" />
      </span>
    </label>
  );
}

export function StatisticsFilterBar({
  filters,
  projectOptions,
}: {
  filters: StatisticsFilterController;
  projectOptions: StatisticsProjectOptionsState;
}): ReactElement {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const rangeLabel = formatStatisticsDateRange(filters.appliedFilters);
  const projectSelectDisabled =
    projectOptions.isPending || projectOptions.options.length <= 1;

  return (
    <section
      aria-label="Statistics filters"
      className="lg:bg-surface-low grid grid-cols-[140px_minmax(0,1fr)] gap-2 lg:grid-cols-2 lg:items-center lg:rounded-md lg:p-4 xl:flex"
    >
      <FilterSelect
        className="order-1 col-span-2 w-full lg:order-2 lg:col-span-1 xl:ml-auto xl:w-auto"
        disabled={projectSelectDisabled}
        label="Project"
        onChange={(event) => filters.setProjectId(event.target.value || null)}
        value={filters.appliedFilters.projectId ?? ''}
      >
        {projectOptions.options.map((option) => (
          <option key={option.value ?? 'all'} value={option.value ?? ''}>
            {option.label}
          </option>
        ))}
      </FilterSelect>
      {projectOptions.error && (
        <div
          className="text-danger order-4 col-span-2 flex items-center gap-2 px-1 text-xs font-medium lg:order-4 xl:ml-auto"
          role="alert"
        >
          <span>Could not load project options.</span>
          <button
            className="focus-visible:outline-primary rounded-xs underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={projectOptions.onRetry}
            type="button"
          >
            Retry
          </button>
        </div>
      )}
      <FilterSelect
        className="order-2 w-full lg:order-3 xl:w-auto"
        label="Status"
        onChange={(event) =>
          filters.setStatus((event.target.value || null) as TaskStatus | null)
        }
        value={filters.appliedFilters.status ?? ''}
      >
        {statisticsStatusOptions.map((option) => (
          <option key={option.value ?? 'all'} value={option.value ?? ''}>
            {option.label}
          </option>
        ))}
      </FilterSelect>
      <div className="relative order-3 flex min-w-0 items-center justify-center lg:order-1 lg:col-span-2 xl:col-span-1">
        <span className="hidden lg:block">
          <IconButton
            aria-label="Previous week"
            icon={<ChevronIcon direction="left" />}
            onClick={() => filters.shiftAppliedDateRange(-7)}
            size="sm"
          />
        </span>
        <button
          aria-expanded={filters.datePanelOpen}
          aria-haspopup="dialog"
          className="bg-surface-low text-text-primary focus-visible:outline-primary flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-md px-3 text-xs font-bold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 lg:h-9 lg:bg-transparent lg:text-sm lg:shadow-none xl:flex-none"
          onClick={
            filters.datePanelOpen
              ? filters.closeDatePanel
              : filters.openDatePanel
          }
          ref={triggerRef}
          type="button"
        >
          <span className="size-4 lg:hidden">
            <CalendarIcon />
          </span>
          <span>{rangeLabel}</span>
        </button>
        <span className="hidden lg:block">
          <IconButton
            aria-label="Next week"
            icon={<ChevronIcon direction="right" />}
            onClick={() => filters.shiftAppliedDateRange(7)}
            size="sm"
          />
        </span>
        <StatisticsDatePanel
          filters={filters}
          panelRef={panelRef}
          triggerRef={triggerRef}
        />
      </div>
    </section>
  );
}
