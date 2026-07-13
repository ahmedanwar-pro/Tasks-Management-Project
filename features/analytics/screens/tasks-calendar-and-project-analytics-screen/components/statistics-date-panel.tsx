import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactElement, RefObject } from 'react';
import type { StatisticsFilterController } from '../types';
import {
  fromStatisticsDateInputValue,
  getStatisticsCalendarDays,
  getStatisticsDayButtonClasses,
  getStatisticsRangePosition,
  statisticsWeekdayLabels,
  toStatisticsDateInputValue,
} from '../utils/statistics-date-panel';
import { ChevronIcon } from './statistics-icons';

const calendarPanelWidth = 320;
const viewportMargin = 16;

type StatisticsDatePanelProps = {
  filters: StatisticsFilterController;
  panelRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

export function StatisticsDatePanel({
  filters,
  panelRef,
  triggerRef,
}: StatisticsDatePanelProps): ReactElement | null {
  const filtersRef = useRef(filters);
  const [visibleMonth, setVisibleMonth] = useState<Date>(() => {
    const startDate = fromStatisticsDateInputValue(
      filters.draftDateRange.startDate,
    );
    const endDate = fromStatisticsDateInputValue(
      filters.draftDateRange.endDate,
    );
    const monthSeed = startDate ?? endDate ?? new Date();

    return new Date(monthSeed.getFullYear(), monthSeed.getMonth(), 1);
  });
  const [panelStyle, setPanelStyle] = useState<CSSProperties | undefined>();
  const [selectingEnd, setSelectingEnd] = useState(false);

  useEffect(() => {
    filtersRef.current = filters;
  });

  useEffect(() => {
    if (!filters.datePanelOpen) return;

    requestAnimationFrame(() => {
      const focusTarget = panelRef.current?.querySelector<HTMLButtonElement>(
        '[data-focus-target="true"]',
      );

      focusTarget?.focus();
    });
  }, [
    filters.datePanelOpen,
    filters.draftDateRange.endDate,
    filters.draftDateRange.startDate,
    panelRef,
  ]);

  useEffect(() => {
    if (!filters.datePanelOpen) return;

    function updatePanelPosition() {
      const trigger = triggerRef.current;

      if (!trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const filterRect = trigger.closest('section')?.getBoundingClientRect();
      const mainRect = trigger.closest('main')?.getBoundingClientRect();
      const width = Math.min(
        calendarPanelWidth,
        window.innerWidth - viewportMargin * 2,
      );
      const minLeft = Math.max(
        viewportMargin,
        mainRect?.left ?? viewportMargin,
      );
      const contentLeft = filterRect?.left ?? mainRect?.left ?? viewportMargin;
      const maxLeft = Math.max(
        minLeft,
        window.innerWidth - width - viewportMargin,
      );
      const left = Math.min(Math.max(contentLeft, minLeft), maxLeft);

      setPanelStyle({
        left,
        top: triggerRect.bottom + 8,
        width,
      });
    }

    requestAnimationFrame(updatePanelPosition);
    window.addEventListener('resize', updatePanelPosition);
    window.addEventListener('scroll', updatePanelPosition, true);

    function dismiss() {
      filtersRef.current.closeDatePanel();
      requestAnimationFrame(() => triggerRef.current?.focus());
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        dismiss();
      }
    }

    function handlePointerDown(event: Event) {
      const target = event.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      )
        dismiss();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('click', handlePointerDown);
    return () => {
      window.removeEventListener('resize', updatePanelPosition);
      window.removeEventListener('scroll', updatePanelPosition, true);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('click', handlePointerDown);
    };
  }, [filters.datePanelOpen, panelRef, triggerRef]);

  if (!filters.datePanelOpen) return null;

  function closeAndRestoreFocus() {
    filters.closeDatePanel();
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function applyAndRestoreFocus() {
    filters.applyDraftDateRange();
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  const draftMatchesApplied =
    filters.draftDateRange.startDate === filters.appliedFilters.startDate &&
    filters.draftDateRange.endDate === filters.appliedFilters.endDate;
  const applyDisabled = Boolean(filters.dateRangeError) || draftMatchesApplied;
  const draftStartDate = fromStatisticsDateInputValue(
    filters.draftDateRange.startDate,
  );
  const draftEndDate = fromStatisticsDateInputValue(
    filters.draftDateRange.endDate,
  );
  const calendarDays = getStatisticsCalendarDays(visibleMonth);
  const monthLabel = visibleMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  const focusTargetValue =
    filters.draftDateRange.startDate || filters.draftDateRange.endDate;

  function moveVisibleMonth(offset: number) {
    setVisibleMonth(
      (currentMonth) =>
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + offset,
          1,
        ),
    );
  }

  function selectDate(date: Date) {
    const nextValue = toStatisticsDateInputValue(date);

    if (!selectingEnd) {
      filters.setDraftDateRange({
        endDate: nextValue,
        startDate: nextValue,
      });
      setSelectingEnd(true);
      return;
    }

    const startDateValue =
      filters.draftDateRange.startDate ||
      filters.draftDateRange.endDate ||
      nextValue;

    if (nextValue < startDateValue) {
      filters.setDraftDateRange({
        endDate: startDateValue,
        startDate: nextValue,
      });
    } else {
      filters.setDraftDateRange({
        endDate: nextValue,
        startDate: startDateValue,
      });
    }

    setSelectingEnd(false);
  }

  return (
    <>
      <button
        aria-hidden="true"
        className="fixed inset-0 z-10 cursor-default"
        onClick={closeAndRestoreFocus}
        tabIndex={-1}
        type="button"
      />
      <div
        aria-label="Choose statistics date range"
        className="fixed z-20 overflow-hidden rounded-[8px] border border-[#E2E8F0] bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
        ref={panelRef}
        role="dialog"
        style={panelStyle}
      >
        <div className="flex flex-col gap-4 p-[21px]">
          <div className="flex items-center justify-between">
            <p className="text-base leading-6 font-bold text-[#041B3C]">
              {monthLabel}
            </p>
            <div className="flex items-start">
              <button
                aria-label="Previous month"
                className="focus-visible:outline-primary flex items-center justify-center rounded-[2px] p-1 text-[#4F5F7B] hover:bg-[#E8EEF9] focus-visible:outline-2"
                onClick={() => moveVisibleMonth(-1)}
                type="button"
              >
                <span className="h-3 w-[7.4px]">
                  <ChevronIcon direction="left" />
                </span>
              </button>
              <button
                aria-label="Next month"
                className="focus-visible:outline-primary ml-1 flex items-center justify-center rounded-[2px] p-1 text-[#4F5F7B] hover:bg-[#E8EEF9] focus-visible:outline-2"
                onClick={() => moveVisibleMonth(1)}
                type="button"
              >
                <span className="h-3 w-[7.4px]">
                  <ChevronIcon direction="right" />
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1" role="grid">
            {statisticsWeekdayLabels.map((label) => (
              <div
                className="flex h-[15px] items-center justify-center text-center text-[10px] leading-[15px] font-bold tracking-[-0.5px] text-[#94A3B8]"
                key={label}
                role="columnheader"
              >
                {label}
              </div>
            ))}

            {calendarDays.map((day) => {
              const rangePosition = getStatisticsRangePosition(
                day.date,
                draftStartDate,
                draftEndDate,
              );
              const isFocusTarget =
                focusTargetValue !== '' && focusTargetValue === day.key;

              return (
                <button
                  className={getStatisticsDayButtonClasses(
                    day.isCurrentMonth,
                    isFocusTarget,
                    rangePosition,
                  )}
                  data-focus-target={isFocusTarget || undefined}
                  key={day.key}
                  onClick={() => selectDate(day.date)}
                  role="gridcell"
                  type="button"
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>

          {filters.dateRangeError ? (
            <p className="text-danger text-xs font-medium" role="alert">
              {filters.dateRangeError}
            </p>
          ) : null}
        </div>
        <div className="border-t border-[#E2E8F080] px-[21px] pt-[17px] pb-[21px]">
          <div className="flex items-start justify-center">
            <button
              className="focus-visible:outline-primary flex h-8 w-[135px] shrink-0 items-center justify-center rounded-[2px] px-3 text-center text-xs leading-4 font-medium text-[#4F5F7B] hover:bg-[#E8EEF9] focus-visible:outline-2"
              onClick={closeAndRestoreFocus}
              type="button"
            >
              Cancel
            </button>
            <div className="w-[143px] shrink-0 pl-2">
              <button
                className="from-primary-container to-primary focus-visible:outline-primary flex h-8 w-full items-center justify-center rounded-[2px] bg-gradient-to-br px-3 text-center text-xs leading-4 font-semibold text-white shadow-sm focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60"
                disabled={applyDisabled}
                onClick={applyAndRestoreFocus}
                type="button"
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
