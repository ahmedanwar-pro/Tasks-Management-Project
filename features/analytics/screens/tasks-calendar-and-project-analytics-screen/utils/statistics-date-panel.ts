import {
  fromStatisticsDateInputValue,
  toStatisticsDateInputValue,
} from './statistics-date-range';

export type StatisticsCalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  key: string;
};

export type StatisticsRangePosition =
  | 'end'
  | 'middle'
  | 'none'
  | 'single'
  | 'start';

export const statisticsWeekdayLabels = [
  'MO',
  'TU',
  'WE',
  'TH',
  'FR',
  'SA',
  'SU',
];

function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function getStatisticsCalendarDays(
  month: Date,
): StatisticsCalendarDay[] {
  const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const lastDayOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const endOffset = 6 - ((lastDayOfMonth.getDay() + 6) % 7);
  const gridStart = addDays(firstDayOfMonth, -startOffset);
  const gridEnd = addDays(lastDayOfMonth, endOffset);
  const days: StatisticsCalendarDay[] = [];

  for (
    let cursor = new Date(gridStart);
    cursor <= gridEnd;
    cursor = addDays(cursor, 1)
  ) {
    days.push({
      date: new Date(cursor),
      isCurrentMonth: cursor.getMonth() === month.getMonth(),
      key: toStatisticsDateInputValue(cursor),
    });
  }

  return days;
}

export function isSameStatisticsDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) {
    return false;
  }

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function getStatisticsRangePosition(
  date: Date,
  startDate: Date | null,
  endDate: Date | null,
): StatisticsRangePosition {
  if (!startDate || !endDate || startDate > endDate) {
    return 'none';
  }

  if (
    isSameStatisticsDay(startDate, endDate) &&
    isSameStatisticsDay(date, startDate)
  ) {
    return 'single';
  }

  if (isSameStatisticsDay(date, startDate)) {
    return 'start';
  }

  if (isSameStatisticsDay(date, endDate)) {
    return 'end';
  }

  if (date > startDate && date < endDate) {
    return 'middle';
  }

  return 'none';
}

export function getStatisticsDayButtonClasses(
  isCurrentMonth: boolean,
  isFocusTarget: boolean,
  rangePosition: StatisticsRangePosition,
): string {
  const baseClasses =
    'focus-visible:outline-primary relative flex h-8 items-center justify-center p-2 text-center text-xs leading-4 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-0';
  const focusTargetClass = isFocusTarget
    ? 'ring-primary/15 ring-2 ring-offset-0'
    : '';

  if (rangePosition === 'single') {
    return [
      baseClasses,
      'bg-primary/20 text-[#003D9B] rounded-[6px] font-bold',
      focusTargetClass,
    ]
      .filter(Boolean)
      .join(' ');
  }

  if (rangePosition === 'start') {
    return [
      baseClasses,
      'bg-primary/20 text-[#003D9B] rounded-l-[6px] rounded-r-none font-bold',
      focusTargetClass,
    ]
      .filter(Boolean)
      .join(' ');
  }

  if (rangePosition === 'end') {
    return [
      baseClasses,
      'bg-primary/20 text-[#003D9B] rounded-r-[6px] rounded-l-none font-bold',
      focusTargetClass,
    ]
      .filter(Boolean)
      .join(' ');
  }

  if (rangePosition === 'middle') {
    return [
      baseClasses,
      'bg-primary/20 text-[#003D9B] rounded-none font-bold',
      focusTargetClass,
    ]
      .filter(Boolean)
      .join(' ');
  }

  return [
    baseClasses,
    'rounded-[6px] bg-transparent font-normal',
    isCurrentMonth ? 'text-[#041B3C]' : 'text-[#CBD5E1]',
    'hover:bg-[#E8EEF9]',
    focusTargetClass,
  ]
    .filter(Boolean)
    .join(' ');
}

export { fromStatisticsDateInputValue, toStatisticsDateInputValue };
